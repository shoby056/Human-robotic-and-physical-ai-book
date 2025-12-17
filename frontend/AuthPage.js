import React, { useEffect } from 'react';

// Redirect from /auth to /signin to maintain compatibility
const AuthPage = () => {
  useEffect(() => {
    // Redirect to signin page
    window.location.href = '/signin';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Redirecting...</h2>
      <p>If you are not redirected automatically, <a href="/signin">click here</a> to go to the sign in page.</p>
    </div>
  );
};

export default AuthPage;