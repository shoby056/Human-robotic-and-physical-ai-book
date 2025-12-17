import React from 'react';
import { useAuth } from './AuthProvider';
import styles from './LoginStatus.module.css';

const LoginStatus = () => {
  const { user, loading, signout } = useAuth();

  if (loading) {
    return <div className={styles.loginStatus}>Loading...</div>;
  }

  if (user) {
    return (
      <div className={styles.loginStatus}>
        <span className={styles.welcomeText}>Welcome, {user.username}!</span>
        <button
          onClick={signout}
          className={styles.signoutButton}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.loginStatus}>
      <a href="/auth" className={styles.signInLink}>
        Sign In
      </a>
    </div>
  );
};

export default LoginStatus;