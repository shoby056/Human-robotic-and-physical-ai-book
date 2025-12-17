import React from 'react';
import { useAuth } from '../components/AuthProvider';
import styles from './personalized.module.css';

const PersonalizedBookPage = () => {
  const { user } = useAuth();

  const chapters = [
    {
      id: 1,
      title: 'Introduction to Physical AI',
      description: 'Fundamental concepts of Physical AI and its applications in robotics'
    },
    {
      id: 2,
      title: 'Humanoid Robotics Fundamentals',
      description: 'Basics of humanoid robotics, including kinematics, dynamics, and control systems'
    },
    {
      id: 3,
      title: 'Sensor Integration and Perception',
      description: 'How sensors are integrated into robotic systems for perception and environment awareness'
    }
  ];

  return (
    <div className={styles.personalizedBookPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Personalized Book Content</h1>
          <p>Add your personal notes, highlights, and images to each chapter</p>
        </div>

        {user ? (
          <div className={styles.chapterList}>
            <h2>Chapters</h2>
            <ul>
              {chapters.map((chapter) => (
                <li key={chapter.id} className={styles.chapterItem}>
                  <div className={styles.chapterInfo}>
                    <h3>{chapter.title}</h3>
                    <p className={styles.chapterDescription}>{chapter.description}</p>
                  </div>
                  <a
                    href={`/personalized-chapter-${chapter.id}`}
                    className={styles.chapterLink}
                  >
                    Personalize Chapter →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.loginPrompt}>
            <p>Please <a href="/signin">sign in</a> to access personalized book features.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedBookPage;