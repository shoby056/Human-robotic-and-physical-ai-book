from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers with improved fallback logic
try:
    from .chatbot import router as chatbot_router
    from .auth import router as auth_router
except ImportError:
    # Fallback for absolute imports when running from project root
    try:
        from backend.chatbot import router as chatbot_router
        from backend.auth import router as auth_router
    except ImportError:
        # Last resort - direct import for standalone execution
        import sys
        import os
        # Add the parent directory to the path so imports work
        parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if parent_dir not in sys.path:
            sys.path.insert(0, parent_dir)
        # Also add the backend directory to the path
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        if backend_dir not in sys.path:
            sys.path.insert(0, backend_dir)
        from chatbot import router as chatbot_router
        from auth import router as auth_router

app = FastAPI(title="Physical AI & Humanoid Robotics Textbook API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # Allow all origins during development
        "https://*.vercel.app",  # Allow Vercel deployments
        "https://shoby056-deploy-book.hf.space"  # Allow requests from the same space
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    allow_origin_regex="https?://localhost:[0-9]+",  # Allow localhost with any port
)

# Include the auth routes
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

# Include the chatbot routes - using /api/chat instead of /api/chatbot for consistency
app.include_router(chatbot_router, prefix="/api/chat", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Physical AI & Humanoid Robotics Textbook Backend API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "textbook-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)