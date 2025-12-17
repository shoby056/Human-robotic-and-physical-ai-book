# Running the Application

This project consists of a Docusaurus frontend and a FastAPI backend that need to be run separately.

## Prerequisites

- Node.js and npm installed
- Python 3.8+ installed
- All dependencies installed

## Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart passlib[bcrypt] python-jose[cryptography]
   ```

## Running the Application

### Method 1: Separate Terminals (Recommended)

1. Terminal 1 - Start the backend server:
   ```bash
   cd src/backend
   python -m main
   ```

2. Terminal 2 - Start the frontend server:
   ```bash
   npm run start
   ```

### Method 2: Using Background Processes

1. Start the backend server in the background:
   ```bash
   cd src/backend && python -m main &
   ```

2. Start the frontend server:
   ```bash
   npm run start
   ```

## Environment Variables

No special frontend environment variables are needed. The Docusaurus dev server is configured to proxy `/api` requests to the backend server.

## Port Configuration

- Frontend (Docusaurus): Usually runs on http://localhost:3000
- Backend (FastAPI): Runs on http://localhost:8000

## Troubleshooting

### Backend Not Responding
- Check that the backend server is running on port 8000
- Verify that the `REACT_APP_BACKEND_URL` environment variable is set correctly

### Frontend Build Errors
- Make sure all dependencies are installed
- Check that environment variables are properly loaded

### Authentication Issues
- Ensure both servers are running simultaneously
- Verify API endpoints are accessible from the frontend
