import React from 'react';
import { AuthProvider } from '../components/AuthProvider';
import Chatbot from '../components/Chatbot';

// Root component that wraps the entire Docusaurus application
export default function Root({ children }) {
  return (
    <AuthProvider>
      {children}
      <Chatbot />
    </AuthProvider>
  );
}