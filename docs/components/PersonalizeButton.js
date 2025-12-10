import React, { useState, useEffect } from 'react';
import styles from './PersonalizeButton.module.css';

const PersonalizeButton = () => {
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    difficulty: 'intermediate',
    learningStyle: 'visual',
    interests: ['ROS 2', 'Gazebo']
  });

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual Learner' },
    { value: 'auditory', label: 'Auditory Learner' },
    { value: 'kinesthetic', label: 'Hands-on Learner' }
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const togglePersonalization = () => {
    setIsPersonalized(!isPersonalized);
    setShowMenu(false);
  };

  const updatePreference = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.personalize-component')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`personalize-component ${styles.personalizeContainer}`}>
      <button
        className={`${styles.personalizeButton} ${isPersonalized ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label={isPersonalized ? "Personalization is on" : "Enable personalization"}
        title={isPersonalized ? "Personalization is enabled" : "Personalize your learning experience"}
      >
        <span className={styles.buttonContent}>
          <span className={styles.icon}>{isPersonalized ? '🎯' : '👤'}</span>
          <span className={styles.label}>
            {isPersonalized ? 'Personalized' : 'Personalize'}
          </span>
        </span>
      </button>

      {showMenu && (
        <div className={styles.menu}>
          <div className={styles.menuHeader}>
            <h3>Personalize Learning</h3>
            <button
              className={styles.closeMenu}
              onClick={() => setShowMenu(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className={styles.menuContent}>
            <div className={styles.preferenceGroup}>
              <label className={styles.preferenceLabel}>Difficulty Level</label>
              <select
                className={styles.preferenceSelect}
                value={userPreferences.difficulty}
                onChange={(e) => updatePreference('difficulty', e.target.value)}
              >
                {difficultyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.preferenceGroup}>
              <label className={styles.preferenceLabel}>Learning Style</label>
              <select
                className={styles.preferenceSelect}
                value={userPreferences.learningStyle}
                onChange={(e) => updatePreference('learningStyle', e.target.value)}
              >
                {learningStyles.map(style => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.preferenceGroup}>
              <label className={styles.preferenceLabel}>Learning Interests</label>
              <div className={styles.interestsContainer}>
                {['ROS 2', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'Physical AI'].map(interest => (
                  <label key={interest} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={userPreferences.interests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setUserPreferences(prev => ({
                            ...prev,
                            interests: [...prev.interests, interest]
                          }));
                        } else {
                          setUserPreferences(prev => ({
                            ...prev,
                            interests: prev.interests.filter(i => i !== interest)
                          }));
                        }
                      }}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.menuFooter}>
            <button
              className={styles.applyButton}
              onClick={togglePersonalization}
            >
              {isPersonalized ? 'Disable Personalization' : 'Enable Personalization'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizeButton;