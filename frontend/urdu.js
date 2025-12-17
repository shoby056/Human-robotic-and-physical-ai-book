import React from 'react';
import styles from './urdu.module.css';

const UrduTranslationPage = () => {
  const chapters = [
    {
      id: 1,
      title: 'Introduction to Physical AI',
      urduTitle: 'فزکل ای آئی کا تعارف',
      description: 'Fundamental concepts of Physical AI and its applications in robotics'
    },
    {
      id: 2,
      title: 'Humanoid Robotics Fundamentals',
      urduTitle: 'ہیومنوائڈ روبوٹکس کے بنیادی اصول',
      description: 'Basics of humanoid robotics, including kinematics, dynamics, and control systems'
    },
    {
      id: 3,
      title: 'Sensor Integration and Perception',
      urduTitle: 'سینسر انٹیگریشن اور تاثر',
      description: 'How sensors are integrated into robotic systems for perception and environment awareness'
    },
    {
      id: 4,
      title: 'Kinematics and Motion Planning',
      urduTitle: 'کنیمیٹکس اور موشن پلاننگ',
      description: 'Understanding kinematics and motion planning for robotic systems'
    },
    {
      id: 5,
      title: 'Dynamics and Control Systems',
      urduTitle: 'ڈائنیمکس اور کنٹرول سسٹمز',
      description: 'Dynamics and control systems in robotics'
    },
    {
      id: 6,
      title: 'Sensors and Perception',
      urduTitle: 'سینسرز اور تاثر',
      description: 'Sensors and perception systems in robotics'
    },
    {
      id: 7,
      title: 'Machine Learning for Robotics',
      urduTitle: 'روبوٹکس کے لیے مشین لرننگ',
      description: 'Machine learning applications in robotics'
    },
    {
      id: 8,
      title: 'Computer Vision and Navigation',
      urduTitle: 'کمپیوٹر وژن اور نیویگیشن',
      description: 'Computer vision and navigation systems for robots'
    },
    {
      id: 9,
      title: 'Human-Robot Interaction',
      urduTitle: 'ہیومن-روبوٹ انٹرایکشن',
      description: 'Human-robot interaction principles and design'
    },
    {
      id: 10,
      title: 'Future of Physical AI and Ethics',
      urduTitle: 'فزکل ای آئی اور اخلاق کا مستقبل',
      description: 'Future of Physical AI and ethical considerations'
    }
  ];

  return (
    <div className={styles.urduTranslationPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Urdu Translation</h1>
          <p>Translated book content with preserved formatting and structure</p>
        </div>

        <div className={styles.chapterList}>
          <h2>Chapters</h2>
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.id} className={styles.chapterItem}>
                <div className={styles.chapterInfo}>
                  <h3>{chapter.urduTitle}</h3>
                  <p className={styles.chapterDescription}>{chapter.description}</p>
                  <p className={styles.chapterOriginalTitle}>
                    <em>Original: {chapter.title}</em>
                  </p>
                </div>
                <a
                  href={`/urdu-chapter-${chapter.id}`}
                  className={styles.chapterLink}
                >
                  Read in Urdu →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UrduTranslationPage;