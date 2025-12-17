import React from 'react';
import { useAuth } from '../components/AuthProvider';
import UserProfile from '../components/UserProfile';
import styles from './profile.module.css';

const ProfilePage = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <h1>Account Profile</h1>
          <div className={styles.loadingState}>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <h1>Account Profile</h1>
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;