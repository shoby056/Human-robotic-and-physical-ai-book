// API Configuration
// For Docusaurus, use a static configuration with fallbacks for safety
const getAPIBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser environment - use relative path for proxy during development
    // This allows the Docusaurus proxy to forward requests to the backend
    return process.env.NODE_ENV === 'development' ? '' : (window.ENV?.REACT_APP_API_URL || 'http://localhost:8001');
  } else {
    // Server environment during build
    return process?.env?.REACT_APP_API_URL || 'http://localhost:8001';
  }
};

const API_BASE_URL = getAPIBaseUrl();

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/chat/chat`,
  INDEX_CONTENT: `${API_BASE_URL}/api/chat/index-content`,
  HEALTH_CHECK: `${API_BASE_URL}/api/chat/health-check`,
};

export default API_BASE_URL;