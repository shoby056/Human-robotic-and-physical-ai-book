from setuptools import setup, find_packages

setup(
    name="physical-ai-textbook",
    version="0.0.1",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.104.1",
        "uvicorn==0.24.0",
        "pydantic==2.5.0",
        "pydantic-settings==2.1.0",
        "langchain==0.1.16",
        "langchain-openai==0.0.5",
        "qdrant-client==1.8.2",
        "openai==1.12.0",
        "python-dotenv==1.0.0",
        "pyjwt==2.8.0",
        "passlib[bcrypt]==1.7.4",
        "python-multipart==0.0.6",
        "sentence-transformers==2.3.0",
        "tiktoken==0.5.1",
        "numpy==1.24.3",
        "requests==2.31.0",
        "googletrans==4.0.0rc1",
    ],
)