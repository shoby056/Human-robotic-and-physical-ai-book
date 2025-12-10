# Physical AI & Humanoid Robotics Textbook

A comprehensive textbook on Physical AI and Humanoid Robotics with interactive features, RAG chatbot assistance, and Urdu translation capabilities.

## Features

- **Interactive Learning**: Engage with simulations and code examples for ROS 2, Gazebo, Unity, and NVIDIA Isaac
- **RAG Chatbot**: Get context-based answers from textbook content
- **Personalized Experience**: User profiles, progress tracking, and adaptive learning
- **Urdu Translation**: Real-time translation to Urdu for native language learning
- **Comprehensive Content**: Covers Physical AI fundamentals, ROS 2, simulation environments, and more

## Architecture

### Frontend
- Docusaurus-based documentation site
- Interactive components for chatbot, translation, and personalization
- Responsive design for multiple devices

### Backend
- FastAPI-based REST API
- Qdrant vector database for RAG functionality
- PostgreSQL for user data and content management
- JWT-based authentication system

## Setup

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Set environment variables:
   ```bash
   # .env file
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET_KEY=your_jwt_secret_key
   NEON_DB_HOST=your_neon_db_host
   NEON_DB_NAME=your_neon_db_name
   NEON_DB_USER=your_neon_db_user
   NEON_DB_PASSWORD=your_neon_db_password
   QDRANT_HOST=your_qdrant_host
   ```

4. Run the backend:
   ```bash
   uvicorn src.backend.main:app --reload --port 8000
   ```

5. Run the frontend (in development):
   ```bash
   npm run start
   ```

## Project Structure

```
├── src/
│   ├── backend/          # FastAPI backend services
│   ├── services/         # Business logic services
│   └── models/           # Data models
├── docs/                 # Docusaurus documentation site
├── chapters/             # Textbook content
├── assets/               # Images and other assets
├── tests/                # Test files
└── specs/                # Specification files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Chatbot
- `POST /api/chatbot/chat` - Chat with the textbook assistant
- `POST /api/chatbot/index-content` - Index content for RAG

### Translation
- `POST /api/translate` - Translate content (to be implemented)

## Development

### Adding New Content
1. Add new chapters to the `/chapters` directory
2. Update `/docs` with Docusaurus-compatible versions
3. Update sidebar configuration in `sidebars.js`

### Extending Features
- Backend services in `/src/backend`
- Frontend components in `/docs/components`
- Business logic in `/src/services`

## Deployment

The application can be deployed to various platforms:

1. **Backend**: Deploy to any Python-compatible platform (Heroku, AWS, etc.)
2. **Frontend**: Build and deploy the Docusaurus site to GitHub Pages, Netlify, or Vercel

```bash
# Build the frontend
npm run build

# Serve the built site locally for testing
npm run serve
```

## Technologies Used

- **Frontend**: Docusaurus, React, JavaScript/TypeScript
- **Backend**: FastAPI, Python
- **Database**: PostgreSQL (Neon), Qdrant (vector database)
- **AI/ML**: LangChain, OpenAI API
- **Authentication**: JWT, bcrypt
- **Translation**: Google Translate API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Specify your license here]