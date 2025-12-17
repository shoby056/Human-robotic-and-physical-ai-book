import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';

// Dynamically import API endpoints to avoid potential issues during SSR
let API_ENDPOINTS;
try {
  // Attempt to import API endpoints
  const apiModule = require('../config/api');
  API_ENDPOINTS = apiModule.API_ENDPOINTS;
} catch (error) {
  // Fallback API endpoints in case of import issues
  const API_BASE_URL = 'http://localhost:8000';
  API_ENDPOINTS = {
    CHAT: `${API_BASE_URL}/api/chat/chat`,
    INDEX_CONTENT: `${API_BASE_URL}/api/chat/index-content`,
    HEALTH_CHECK: `${API_BASE_URL}/api/chat/health-check`,
  };
}

const Chatbot = ({ isFloating = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const messagesEndRef = useRef(null);

  // Detect theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Format history to ensure proper data types for backend, only include defined fields
      const formattedHistory = messages.slice(-10).map(msg => {
        const formattedMsg = {
          id: String(msg.id), // Convert ID to string
          text: msg.text || '',
          sender: msg.sender || 'user',
        };

        // Only add optional fields if they exist and are not undefined/null
        if (msg.timestamp) {
          formattedMsg.timestamp = new Date(msg.timestamp).toISOString();
        }
        if (msg.sources && Array.isArray(msg.sources) && msg.sources.length > 0) {
          formattedMsg.sources = msg.sources.map(s => String(s));
        } else if (msg.sources && !Array.isArray(msg.sources)) {
          formattedMsg.sources = [String(msg.sources)];
        }
        // Only include confidence if it has a value
        if (msg.confidence !== undefined && msg.confidence !== null) {
          formattedMsg.confidence = String(msg.confidence);
        }
        // Only include tokens_used if it has a value
        if (msg.tokens_used !== undefined && msg.tokens_used !== null) {
          formattedMsg.tokens_used = String(msg.tokens_used);
        }

        return formattedMsg;
      });

      // Call the backend API with conversation history
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
          history: formattedHistory, // Send last 10 messages as context
          user_id: null
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'bot',
          sources: data.sources,
          confidence: data.confidence,
          tokens_used: data.tokens_used,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        let errorDetail = 'Unknown error';
        try {
          const errorData = await response.json();
          // Handle both string and object error details
          if (typeof errorData.detail === 'string') {
            errorDetail = errorData.detail;
          } else if (typeof errorData.detail === 'object') {
            errorDetail = JSON.stringify(errorData.detail) || 'Error object received';
          } else {
            errorDetail = String(errorData.detail || 'Unknown error');
          }
        } catch (parseError) {
          // If parsing fails, use the raw response text
          try {
            const errorText = await response.text();
            errorDetail = errorText || 'Error occurred but no details available';
          } catch {
            errorDetail = 'Error occurred but could not parse details';
          }
        }

        const errorMessage = {
          id: Date.now() + 1,
          text: `Sorry, I encountered an error: ${errorDetail}`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Format error message to ensure it's always a string
      let errorMessageText = 'Sorry, I\'m having trouble connecting to the server. Please check your connection and try again.';

      if (error && typeof error === 'object') {
        if (error.message) {
          errorMessageText = `Sorry, I encountered an error: ${error.message}`;
        } else {
          errorMessageText = `Sorry, I encountered an error: ${JSON.stringify(error)}`;
        }
      } else if (typeof error === 'string') {
        errorMessageText = `Sorry, I encountered an error: ${error}`;
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: errorMessageText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(errorMessageText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  // Apply theme classes to container
  const containerClass = `${styles.chatbotContainer} ${styles[theme]}`;
  const chatWindowClass = `${styles.chatWindow} ${styles[theme]}`;
  const messageClass = (sender) => `${styles.message} ${styles[sender]} ${styles[theme]}`;

  return (
    <div className={containerClass}>
      {isOpen && (
        <div className={chatWindowClass}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderContent}>
              <h3>CCR Assistant</h3>
              <div className={styles.headerActions}>
                <button
                  className={styles.clearButton}
                  onClick={clearChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  🗑️
                </button>
                <button
                  className={styles.closeButton}
                  onClick={toggleChat}
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 ? (
              <div className={styles.welcomeMessage}>
                <p>Hello! I'm CCR, your AI assistant for Physical AI & Humanoid Robotics.</p>
                <p>Ask me anything about the textbook content, and I'll provide detailed answers following the format:</p>
                <ul>
                  <li><strong>Short Answer</strong></li>
                  <li><strong>Deep Explanation</strong></li>
                  <li><strong>Summary</strong></li>
                </ul>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={messageClass(message.sender)}
                >
                  <div className={styles.messageText}>{message.text}</div>
                  {(message.sources && message.sources.length > 0) && (
                    <div className={styles.sources}>
                      <small>Sources: {message.sources.slice(0, 3).map(source =>
                        typeof source === 'string' ? source :
                        source.toString ? source.toString() :
                        JSON.stringify(source)
                      ).join(', ')}{message.sources.length > 3 ? '...' : ''}</small>
                    </div>
                  )}
                  {message.tokens_used && (
                    <div className={styles.tokensInfo}>
                      <small>Tokens: {message.tokens_used}</small>
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className={messageClass('bot')}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              Error: {typeof error === 'string' ? error : error?.toString ? error.toString() : JSON.stringify(error)}
            </div>
          )}

          <div className={styles.chatInput}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the textbook content..."
              rows="1"
              disabled={isLoading}
              autoFocus={isOpen && messages.length === 0}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={styles.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className={`${styles.chatButton} ${isOpen ? styles.open : ''} ${styles[theme]}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '×' : '🤖'}
      </button>
    </div>
  );
};

export default Chatbot;