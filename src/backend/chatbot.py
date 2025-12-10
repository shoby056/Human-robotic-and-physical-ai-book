from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from .database import qdrant_client, QDRANT_COLLECTION_NAME
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


class ChatRequest(BaseModel):
    query: str
    context: Optional[str] = None
    user_id: Optional[str] = None
    history: List[Dict[str, str]] = []

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

    async def get_response(self, query: str, history: List[Dict[str, str]] = None) -> ChatResponse:
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
            Follow the format: (1) Short Answer, (2) Deep Explanation, (3) Steps if relevant, (4) Code if relevant, (5) Summary.

            Context from textbook:
            {context_str}

            Previous conversation:
            """

            # Add conversation history
            for msg in history[-5:]:  # Use last 5 messages as context
                role = msg.get("sender", "user")
                text = msg.get("text", "")
                full_context += f"\n{role}: {text}"

            # Add the current question
            full_context += f"\nuser: {query}\nassistant:"

            # Prepare messages for OpenAI
            messages = [
                {"role": "system", "content": "You are CCR, an AI assistant for the Physical AI & Humanoid Robotics textbook. Answer questions based on the provided context and textbook knowledge. Follow the format: (1) Short Answer, (2) Deep Explanation, (3) Steps if relevant, (4) Code if relevant, (5) Summary. Always be accurate, helpful, and educational."},
            ]

            # Add conversation history
            for msg in history[-10:]:  # Limit to last 10 messages
                role = "user" if msg.get("sender") == "user" else "assistant"
                content = msg.get("text", "")
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

            return ChatResponse(
                response=answer,
                sources=sources,
                confidence=0.85,  # This would be calculated based on similarity scores in a full implementation
                tokens_used=tokens_used
            )
        except Exception as e:
            logger.error(f"Error generating chatbot response: {str(e)}")
            return ChatResponse(
                response="I'm sorry, I encountered an error processing your request. Please try again.",
                sources=[],
                confidence=0.0,
                tokens_used=0
            )

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