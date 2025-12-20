from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
try:
    from .database import qdrant_client, QDRANT_COLLECTION_NAME
except ImportError:
    # Fallback for when running as a standalone module
    from database import qdrant_client, QDRANT_COLLECTION_NAME
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
import openai
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

print("OpenAI Key Loaded:", openai.api_key is not None)


class MessageHistoryItem(BaseModel):
    id: Union[str, int]
    text: str
    sender: str
    timestamp: Optional[str] = None
    sources: Optional[List[str]] = []
    confidence: Optional[float] = None
    tokens_used: Optional[int] = None

    model_config = {
        'arbitrary_types_allowed': True,
        'extra': 'ignore'
    }


class ChatRequest(BaseModel):
    query: str
    context: Optional[str] = None
    user_id: Optional[str] = None
    history: List[MessageHistoryItem] = []

class ChatResponse(BaseModel):
    response: str
    sources: List[str]
    confidence: float
    tokens_used: int

class IndexContentRequest(BaseModel):
    content: str
    content_id: str
    metadata: Dict[str, Any] = {}

class ChatbotService:
    def __init__(self):
        # Initialize the LLM
        self.llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0.3,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )

        # Initialize the embedding model for RAG
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

        # Use the collection name from database config
        self.collection_name = QDRANT_COLLECTION_NAME

    def index_content(self, content: str, content_id: str, metadata: dict = None):
        """Index content for RAG retrieval."""
        if metadata is None:
            metadata = {}

        try:
            # Generate embedding for the content
            embedding = self.embedding_model.encode(content).tolist()

            # Prepare the point for Qdrant
            point = models.PointStruct(
                id=content_id,
                vector=embedding,
                payload={
                    "content": content,
                    "content_id": content_id,
                    "metadata": metadata
                }
            )

            # Upsert the point to Qdrant
            qdrant_client.upsert(
                collection_name=self.collection_name,
                points=[point]
            )

            logger.info(f"Content indexed successfully with ID: {content_id}")
            return True
        except Exception as e:
            logger.error(f"Error indexing content: {str(e)}")
            return False

    def query_content(self, query: str, top_k: int = 5):
        """Query indexed content for relevant context."""
        try:
            # Generate embedding for the query
            query_embedding = self.embedding_model.encode(query).tolist()

            # Search in Qdrant for similar content
            search_results = qdrant_client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=top_k,
                with_payload=True
            )

            # Extract relevant content and sources
            contexts = []
            sources = []
            for result in search_results:
                if result.payload and "content" in result.payload:
                    contexts.append(result.payload["content"])
                    sources.append(result.payload.get("content_id", "unknown"))

            return contexts, sources
        except Exception as e:
            logger.error(f"Error querying content: {str(e)}")
            return ["Error retrieving content from the textbook."], []

    async def get_response(self, query: str, history: List[MessageHistoryItem] = None) -> ChatResponse:
        """Generate a response to the user's query using RAG."""
        try:
            if history is None:
                history = []

            # Retrieve relevant context from the textbook
            retrieved_contexts, sources = self.query_content(query)
            context_str = "\n\n".join(retrieved_contexts)

            # Build the full prompt with context and conversation history
            full_context = f"""
            You are CCR, an AI assistant for the Physical AI & Humanoid Robotics textbook.
            Answer questions based on the provided context and textbook knowledge.
            Follow the format: Short Answer, Deep Explanation, Summary.

            Context from textbook:
            {context_str}

            Previous conversation:
            """

            # Add conversation history
            for msg in history[-5:]:  # Use last 5 messages as context
                role = getattr(msg, 'sender', 'user') if hasattr(msg, 'sender') else msg.get("sender", "user") if isinstance(msg, dict) else "user"
                text = getattr(msg, 'text', '') if hasattr(msg, 'text') else msg.get("text", "") if isinstance(msg, dict) else ""
                full_context += f"\n{role}: {text}"

            # Add the current question
            full_context += f"\nuser: {query}\nassistant:"

            # Prepare messages for OpenAI
            messages = [
                {"role": "system", "content": "You are CCR, an AI assistant for the Physical AI & Humanoid Robotics textbook. Answer questions based on the provided context and textbook knowledge. Follow the format: Short Answer, Deep Explanation, Summary. Always be accurate, helpful, and educational."},
            ]

            # Add conversation history
            for msg in history[-10:]:  # Limit to last 10 messages
                if isinstance(msg, dict):
                    role = "user" if msg.get("sender") == "user" else "assistant"
                    content = msg.get("text", "")
                else:
                    # Handle Pydantic model instance
                    role = "user" if getattr(msg, 'sender', 'user') == "user" else "assistant"
                    content = getattr(msg, 'text', "")
                messages.append({"role": role, "content": content})

            # Add the current question
            messages.append({"role": "user", "content": f"Context: {context_str}\n\nQuestion: {query}"})

            # Call OpenAI API
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=1000,
                temperature=0.7
            )

            answer = response.choices[0].message.content
            tokens_used = response.usage.total_tokens if response.usage else 0

            # Ensure the response follows the required format (Short Answer, Deep Explanation, Summary)
            formatted_answer = self.ensure_response_format(answer)

            return ChatResponse(
                response=formatted_answer,
                sources=sources,
                confidence=0.85,  # This would be calculated based on similarity scores in a full implementation
                tokens_used=tokens_used
            )
        except openai.APIError as api_error:
            logger.error(f"OpenAI API error: {str(api_error)}")
            # Provide a more sophisticated fallback response
            fallback_response = await self.get_fallback_response(query, context_str)
            return ChatResponse(
                response=fallback_response,
                sources=sources,
                confidence=0.5,  # Lower confidence for fallback
                tokens_used=0
            )
        except Exception as e:
            logger.error(f"Error generating chatbot response: {str(e)}")
            return ChatResponse(
                response="I'm sorry, I encountered an error processing your request. Please try again.",
                sources=[],
                confidence=0.0,
                tokens_used=0
            )

    async def get_fallback_response(self, query: str, context: str = "") -> str:
        """
        Provide a fallback response when OpenAI API is unavailable.
        This method implements simple keyword matching for common textbook topics.
        All responses follow the required format: Short Answer, Deep Explanation, Summary
        """
        query_lower = query.lower()

        # Define some basic responses for common queries about Physical AI & Humanoid Robotics
        if any(keyword in query_lower for keyword in ["hello", "hi", "hey", "greetings"]):
            return """Short Answer: Hello! I'm CCR, your AI assistant for Physical AI & Humanoid Robotics.

Deep Explanation: I'm designed to help you understand concepts related to Physical AI and Humanoid Robotics.

Summary: I'm here to assist with your textbook questions!"""

        elif any(keyword in query_lower for keyword in ["physical ai", "physical artificial intelligence"]):
            return """Short Answer: Physical AI is a field that combines artificial intelligence with physical systems and robotics.

Deep Explanation: Physical AI refers to AI systems that interact with the physical world through sensors and actuators, learning from physical interactions to improve performance. This interdisciplinary field combines elements of robotics, machine learning, and control theory to create systems that can perceive, reason, and act in physical environments.

Summary: Physical AI bridges the gap between digital AI and physical systems, enabling robots to learn and adapt through physical interaction."""

        elif any(keyword in query_lower for keyword in ["humanoid", "robotics", "humanoid robotics"]):
            return """Short Answer: Humanoid robotics is the branch of robotics focused on creating robots with human-like form and capabilities.

Deep Explanation: Humanoid robots are designed to mimic human appearance and behavior, often featuring bipedal locomotion, human-like limbs, and sometimes facial features. These robots are engineered to operate in human environments and interact naturally with humans, making them suitable for applications like assistance, healthcare, and social interaction.

Summary: Humanoid robotics aims to create robots that can operate in human environments and interact naturally with humans."""

        elif any(keyword in query_lower for keyword in ["what", "tell me", "explain"]):
            return f"""Short Answer: I'm an AI assistant for the Physical AI & Humanoid Robotics textbook.

Deep Explanation: Based on the context provided: {context or 'No specific context available'}

Summary: I can help explain concepts related to Physical AI and Humanoid Robotics. Try asking about specific topics like "What is Physical AI?" or "Explain humanoid robotics."""

        else:
            return f"""Short Answer: I'm currently unable to connect to the AI service due to API limitations.

Deep Explanation: The query you asked was: '{query}'. I should be able to help with questions about Physical AI & Humanoid Robotics, but I'm experiencing connectivity issues with the underlying AI service. This could be due to network issues, API key problems, or service unavailability.

Summary: Please check your OpenAI API configuration. In the meantime, I recommend reviewing the textbook chapters related to your question."""

    def ensure_response_format(self, response: str) -> str:
        """
        Ensures that the response follows the required format:
        Short Answer, Deep Explanation, Summary
        """
        # Check if the response already follows the format
        if ("Short Answer:" in response and
            "Deep Explanation:" in response and
            "Summary:" in response):
            return response

        # If not in the correct format, wrap it in the required format
        lines = response.strip().split('\n')

        # Extract the first meaningful sentence/paragraph as the short answer
        if lines:
            short_answer = lines[0].strip() if lines[0].strip() else "I've processed your request."
        else:
            short_answer = "I've processed your request."

        # The full response becomes the deep explanation
        deep_explanation = response.strip()

        # Create a summary (first 100 characters or first sentence)
        summary_parts = response.split('. ')
        if summary_parts:
            summary = (summary_parts[0] + '.').strip() if summary_parts[0].strip() else "Response processed."
        else:
            summary = "Response processed."

        return f"""Short Answer: {short_answer}

Deep Explanation: {deep_explanation}

Summary: {summary}"""

# Initialize the chatbot service
chatbot_service = ChatbotService()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    """Endpoint for chatbot queries."""
    if not chat_request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    response = await chatbot_service.get_response(
        query=chat_request.query,
        history=chat_request.history
    )
    return response

@router.post("/index-content")
async def index_content_endpoint(request: IndexContentRequest):
    """Endpoint to index new content for RAG."""
    if not request.content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty")

    try:
        success = chatbot_service.index_content(
            content=request.content,
            content_id=request.content_id,
            metadata=request.metadata
        )

        if success:
            return {"message": "Content indexed successfully", "content_id": request.content_id}
        else:
            raise HTTPException(status_code=500, detail="Failed to index content")
    except Exception as e:
        logger.error(f"Error indexing content: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error indexing content: {str(e)}")

@router.post("/health-check")
async def health_check():
    """Comprehensive health check for the chatbot service."""
    health_status = {
        "status": "healthy",
        "service": "chatbot",
        "checks": {
            "qdrant_connection": qdrant_client is not None,
            "openai_api_key": bool(os.getenv("OPENAI_API_KEY")),
            "collection_exists": False
        }
    }

    if qdrant_client:
        try:
            qdrant_client.get_collection(QDRANT_COLLECTION_NAME)
            health_status["checks"]["collection_exists"] = True
        except:
            health_status["checks"]["collection_exists"] = False

    return health_status

if __name__ == "__main__":
    # This would be used for testing the chatbot service independently
    import asyncio

    async def test_chatbot():
        response = await chatbot_service.get_response("What is Physical AI?")
        print(response)

    # asyncio.run(test_chatbot())