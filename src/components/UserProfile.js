import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user, loading, error, signout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  });
  const [updateMessage, setUpdateMessage] = useState('');

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={styles.notLoggedIn}>
        <h2>Please sign in to view your profile</h2>
        <button
          onClick={() => window.location.href = '/signin'}
          className={styles.signInButton}
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleEdit = () => {
    setEditData({
      full_name: user.full_name || '',
      email: user.email || '',
    });
    setIsEditing(true);
    setUpdateMessage('');
  };

  const handleCancel = () => {
    setEditData({
      full_name: user.full_name || '',
      email: user.email || '',
    });
    setIsEditing(false);
    setUpdateMessage('');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          full_name: editData.full_name,
          email: editData.email,
        }),
      });

      if (!response.ok) {
        // Handle non-200 responses
        const errorResult = await response.json().catch(() => ({
          detail: `HTTP error! status: ${response.status}`
        }));
        setUpdateMessage(errorResult.detail || `HTTP error! status: ${response.status}`);
        return;
      }

      const result = await response.json();
      setUpdateMessage('Profile updated successfully!');
      // Update the user context with new data
      // In a real app, you might want to update the context
      setTimeout(() => {
        window.location.reload(); // Simple way to refresh the user data
      }, 1000);
    } catch (err) {
      console.error('Profile update error:', err);
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        // This is likely an HTML response (like a 404 page) instead of JSON
        setUpdateMessage('Server error: Authentication service is not available. Make sure the backend server is running.');
      } else {
        setUpdateMessage('Error updating profile');
      }
    }
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {updateMessage && <div className={styles.updateMessage}>{updateMessage}</div>}

      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <label>Username:</label>
          <span>{user.username}</span>
        </div>

        {isEditing ? (
          <>
            <div className={styles.infoItem}>
              <label htmlFor="full_name">Full Name:</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={editData.full_name}
                onChange={handleInputChange}
                className={styles.editInput}
              />
            </div>

            <div className={styles.infoItem}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className={styles.editInput}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.infoItem}>
              <label>Full Name:</label>
              <span>{user.full_name || 'Not provided'}</span>
            </div>

            <div className={styles.infoItem}>
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.buttonGroup}>
        {isEditing ? (
          <>
            <button onClick={handleSave} className={styles.saveButton}>
              Save Changes
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEdit} className={styles.editButton}>
            Edit Profile
          </button>
        )}

        <button onClick={signout} className={styles.signoutButton}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;