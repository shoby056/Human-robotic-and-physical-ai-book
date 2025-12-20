// API Configuration
// For Docusaurus, use a static configuration with fallbacks for safety
const getAPIBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser environment
    // Use the Hugging Face Space backend URL in production
    if (process.env.NODE_ENV === 'development') {
      // During development, use relative path for proxy
      return '';
    } else {
      // In production, use the Hugging Face Space backend
      return 'https://shoby056-deploy-book.hf.space';
    }
  } else {
    // Server environment during build
    return process?.env?.REACT_APP_API_URL || 'https://shoby056-deploy-book.hf.space';
  }
};

const API_BASE_URL = getAPIBaseUrl();

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/chat/chat`,
  INDEX_CONTENT: `${API_BASE_URL}/api/chat/index-content`,
  HEALTH_CHECK: `${API_BASE_URL}/api/chat/health-check`,
};

export default API_BASE_URL;