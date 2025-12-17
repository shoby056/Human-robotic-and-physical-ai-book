import React from 'react';
import SignupForm from '../components/SignupForm';
import styles from './AuthPage.module.css';
import { useAuth } from '../components/AuthProvider';

const SignupPage = () => {
  const { user } = useAuth();

  const handleAuthSuccess = () => {
    // Redirect to home or previous page after successful signup
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
        <SignupForm onSuccess={handleAuthSuccess} />
        <div className={styles.toggleView}>
          <p>
            Already have an account?{' '}
            <a href="/signin" className={styles.toggleButton}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;