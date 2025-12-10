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
      // Call the backend API with conversation history
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
          history: messages.slice(-10), // Send last 10 messages as context
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
        const errorData = await response.json();
        const errorMessage = {
          id: Date.now() + 1,
          text: `Sorry, I encountered an error: ${errorData.detail || 'Unknown error'}`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I\'m having trouble connecting to the server. Please check your connection and try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(error.message);
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
                  <li><strong>Steps</strong> (if relevant)</li>
                  <li><strong>Code</strong> (if relevant)</li>
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
                      <small>Sources: {message.sources.slice(0, 3).join(', ')}{message.sources.length > 3 ? '...' : ''}</small>
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
              Error: {error}
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