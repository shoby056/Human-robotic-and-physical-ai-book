import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './ChapterLoader.module.css';

// Define the modules data
const modulesData = [
  {
    id: 'module1',
    title: 'Module 1: ROS 2 Fundamentals',
    description: 'Learn the fundamentals of Robot Operating System 2, including nodes, topics, services, and actions for building robust robotic applications.',
    path: '/docs/modules/module1-ros2-fundamentals'
  },
  {
    id: 'module2',
    title: 'Module 2: Digital Twin (Gazebo & Unity)',
    description: 'Explore digital twin technologies using Gazebo physics simulation and Unity 3D for creating virtual replicas of robotic systems.',
    path: '/docs/modules/module2-digital-twin'
  },
  {
    id: 'module3',
    title: 'Module 3: NVIDIA Isaac AI & Perception',
    description: 'Master NVIDIA Isaac SDK for AI-powered robotics, including perception algorithms and GPU-accelerated computing.',
    path: '/docs/modules/module3-nvidia-isaac'
  },
  {
    id: 'module4',
    title: 'Module 4: Vision-Language-Action (VLA)',
    description: 'Understand Vision-Language-Action models for multimodal robotics applications and human-robot interaction.',
    path: '/docs/modules/module4-vla'
  },
  {
    id: 'capstone',
    title: 'Capstone Project: Autonomous Humanoid Robot',
    description: 'Integrate all concepts in a comprehensive project building an autonomous humanoid robot system.',
    path: '/docs/modules/capstone-project'
  }
];

export default function ChapterLoader() {
  const [showModules, setShowModules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadedModules, setLoadedModules] = useState([]);

  const handleStartReading = async () => {
    if (showModules) {
      setShowModules(false);
      return;
    }

    setLoading(true);

    // Simulate loading modules
    setTimeout(() => {
      setLoadedModules(modulesData);
      setShowModules(true);
      setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.chapterLoaderContainer}>
      <button
        className={`${styles.startReadingButton} ${showModules ? styles.active : ''}`}
        onClick={handleStartReading}
        disabled={loading}
      >
        {loading ? 'Loading...' : showModules ? 'Hide Modules' : '📘 Start Reading'}
      </button>

      {showModules && (
        <div className={styles.modulesContainer}>
          <h2 className={styles.modulesTitle}>Course Modules</h2>
          <div className={styles.modulesGrid}>
            {loadedModules.map((module) => (
              <div key={module.id} className={styles.moduleCard}>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <p className={styles.moduleDescription}>{module.description}</p>
                <Link to={module.path} className={styles.moduleButton}>
                  Go to Module →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}