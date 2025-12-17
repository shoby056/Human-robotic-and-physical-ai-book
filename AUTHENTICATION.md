# Authentication Setup

This project uses a separate backend and frontend architecture for authentication. The backend is built with FastAPI and the frontend with React/Docusaurus.

## Backend Authentication Routes

The backend provides the following authentication endpoints:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update current user profile
- `GET /api/auth/health` - Health check for auth service

## Frontend Configuration

The frontend makes API requests to the backend using relative URLs (like `/api/auth/login`). The Docusaurus development server is configured to proxy these requests to the backend server.

## Running the Application

1. Start the backend server:
   ```bash
   cd src/backend
   python -m main
   ```

2. Start the frontend server:
   ```bash
   npm run start
   ```

## Troubleshooting

### 404 Errors
If you're getting 404 errors on authentication routes:
- Make sure the backend server is running
- Check that both servers are running on the expected ports
- Verify the Docusaurus dev server proxy is configured correctly

### CORS Issues
The backend includes CORS middleware to allow requests from the frontend.

## Security Notes

- Passwords are hashed using bcrypt
- Authentication tokens are JWT tokens
- The default JWT secret should be changed in production
