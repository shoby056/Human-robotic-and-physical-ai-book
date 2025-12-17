import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './ChapterSelector.module.css';

const chapters = [
  {
    id: 'chapter1',
    title: 'Chapter 1: Introduction to Physical AI',
    path: '/docs/chapter1/intro',
    description: 'Basic concepts of Physical AI and Humanoid Robotics'
  },
  {
    id: 'chapter2',
    title: 'Chapter 2: ROS 2 Fundamentals and Node Architecture',
    path: '/docs/chapter2/intro',
    description: 'ROS 2 Architecture, Node Communication, Topics, Services, and Actions'
  },
  {
    id: 'chapter3',
    title: 'Chapter 3: Gazebo Physics Simulation and Unity Digital Twins',
    path: '/docs/chapter3/intro',
    description: 'Gazebo Physics Simulation, Unity Digital Twins, NVIDIA Isaac Integration'
  },
  {
    id: 'chapter4',
    title: 'Chapter 4: Advanced Humanoid Robotics',
    path: '/docs/chapter4/intro',
    description: 'Humanoid Locomotion, Balance Control, Gait Planning'
  },
  {
    id: 'chapter5',
    title: 'Chapter 5: AI in Physical Systems',
    path: '/docs/chapter5/intro',
    description: 'Perception in Physical AI, Planning and Control, Learning in Physical Systems'
  }
];

export default function ChapterSelector() {
  const [showChapters, setShowChapters] = useState(false);

  const toggleChapters = () => {
    setShowChapters(!showChapters);
  };

  return (
    <div className={styles.chapterSelectorContainer}>
      <button
        className={styles.startReadingButton}
        onClick={toggleChapters}
      >
        {showChapters ? 'Hide Chapters' : '📘 Start Reading'}
      </button>

      {showChapters && (
        <div className={styles.chaptersList}>
          <h2 className={styles.chaptersTitle}>Select a Chapter</h2>
          <ul className={styles.chaptersGrid}>
            {chapters.map((chapter) => (
              <li key={chapter.id} className={styles.chapterItem}>
                <Link to={chapter.path} className={styles.chapterLink}>
                  <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                  <p className={styles.chapterDescription}>{chapter.description}</p>
                  <span className={styles.chapterReadMore}>Read Chapter →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}