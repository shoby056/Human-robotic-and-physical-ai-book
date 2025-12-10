import React from 'react';
import Chatbot from '../components/Chatbot';

// Root component that wraps the entire Docusaurus application
export default function Root({ children }) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}