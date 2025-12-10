from qdrant_client import QdrantClient
from qdrant_client.http import models
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "textbook_content")

# Connect to Qdrant
try:
    qdrant_client = QdrantClient(
        host=QDRANT_HOST,
        port=QDRANT_PORT,
        # Uncomment the following lines if using Qdrant Cloud
        # url=os.getenv("QDRANT_URL"),
        # api_key=os.getenv("QDRANT_API_KEY"),
    )

    # Ensure the collection exists
    try:
        qdrant_client.get_collection(QDRANT_COLLECTION_NAME)
        print(f"Collection {QDRANT_COLLECTION_NAME} already exists")
    except:
        # Create collection if it doesn't exist
        qdrant_client.create_collection(
            collection_name=QDRANT_COLLECTION_NAME,
            vectors_config=models.VectorParams(size=384, distance=models.Distance.COSINE)  # Sentence Transformers embedding size
        )
        print(f"Created collection {QDRANT_COLLECTION_NAME}")

    print("Connected to Qdrant")
except Exception as e:
    print(f"Error connecting to Qdrant: {e}")
    print("WARNING: Qdrant is not available. RAG functionality will be limited.")
    # Create a mock client that returns empty results for graceful degradation
    class MockQdrantClient:
        def get_collection(self, collection_name):
            # Return a mock response for health checks
            return {"name": collection_name, "status": "mock"}

        def create_collection(self, **kwargs):
            pass

        def upsert(self, **kwargs):
            pass

        def search(self, **kwargs):
            return []

    qdrant_client = MockQdrantClient()
