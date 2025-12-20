import React from 'react';
import SigninForm from '../components/SigninForm';
import styles from './AuthPage.module.css';
import { useAuth } from '../components/AuthProvider';

const SigninPage = () => {
  const { user } = useAuth();

  const handleAuthSuccess = () => {
    // Redirect to home or previous page after successful signin
    window.location.href = '/';
  };

  if (user) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2>Welcome, {user.username}!</h2>
          <p>You are already logged in.</p>
          <button
            onClick={() => window.location.href = '/'}
            className={styles.homeButton}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <SigninForm onSuccess={handleAuthSuccess} />
        <div className={styles.toggleView}>
          <p>
            Don't have an account?{' '}
            <a href="/signup" className={styles.toggleButton}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;