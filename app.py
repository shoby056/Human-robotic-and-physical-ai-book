import os
import subprocess
import time
import threading
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import HTMLResponse
import uvicorn
import gradio as gr

# Import your backend app
from backend.main import app as backend_app

# Create the main FastAPI app
main_app = FastAPI()

# Add CORS middleware
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origin_regex="https?://localhost:[0-9]+",
)

class CORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Methods'] = '*'
        response.headers['Access-Control-Allow-Headers'] = '*'
        return response

main_app.add_middleware(CORSMiddleware)

# Mount the backend API routes under /api
main_app.mount("/api", backend_app)

# Serve static files from the Docusaurus build directory
if os.path.exists("build"):
    main_app.mount("/", StaticFiles(directory="build", html=True), name="static")
else:
    # If build doesn't exist, create a simple fallback
    @main_app.get("/")
    async def root():
        return HTMLResponse(content="<h1>Backend API Running</h1><p>Docusaurus build not found. Please run 'npm run build' to build the frontend.</p>")

# For Gradio interface (optional)
def launch_gradio_interface():
    with gr.Blocks() as demo:
        gr.Markdown("# Physical AI & Humanoid Robotics Textbook")
        gr.Markdown("The frontend is served at the root URL, and API endpoints are available at /api/")

        with gr.Accordion("API Status", open=True):
            gr.Textbox(value="Check API status at /api/health", label="API Info")

    return demo

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", type=str, default="0.0.0.0")
    parser.add_argument("--port", type=int, default=7860)
    args = parser.parse_args()

    # Run the FastAPI app
    uvicorn.run(main_app, host=args.host, port=args.port)