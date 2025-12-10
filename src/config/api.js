// API Configuration
// For Docusaurus, use a static configuration or check for window object safely
const API_BASE_URL = 'http://localhost:8000'; // Default API URL

// Optional: You can also read from a global variable that can be set in docusaurus.config.js
// const API_BASE_URL = (typeof window !== 'undefined' && window.API_BASE_URL) ? window.API_BASE_URL : 'http://localhost:8000';

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/chat/chat`,
  INDEX_CONTENT: `${API_BASE_URL}/api/chat/index-content`,
  HEALTH_CHECK: `${API_BASE_URL}/api/chat/health-check`,
};

export default API_BASE_URL;