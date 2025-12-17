import React, { useState, useEffect } from 'react';
import styles from './UrduTranslation.module.css';

const UrduTranslation = () => {
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: 'Introduction to Physical AI',
      urduTitle: 'فزکل ای آئی کا تعارف',
      content: 'This chapter introduces the fundamental concepts of Physical AI and its applications in robotics...',
      urduContent: 'یہ باب فزکل ای آئی کے بنیادی تصورات اور روبوٹکس میں اس کے اطلاقات کا تعارف کراتا ہے...',
      originalFormatting: true
    },
    {
      id: 2,
      title: 'Humanoid Robotics Fundamentals',
      urduTitle: 'ہیومنوائڈ روبوٹکس کے بنیادی اصول',
      content: 'This chapter covers the basics of humanoid robotics, including kinematics, dynamics, and control systems...',
      urduContent: 'یہ باب ہیومنوائڈ روبوٹکس کے بنیادی اصولوں کو احاطہ کرتا ہے، بشمول کنیمیٹکس، ڈائنیمکس، اور کنٹرول سسٹمز...',
      originalFormatting: true
    },
    {
      id: 3,
      title: 'Sensor Integration and Perception',
      urduTitle: 'سینسر انٹیگریشن اور تاثر',
      content: 'This chapter explores how sensors are integrated into robotic systems for perception and environment awareness...',
      urduContent: 'یہ باب اس بات کا جائزہ لیتا ہے کہ روبوٹک سسٹمز میں تاثر اور ماحول کے بارے میں آگاہی کے لیے سینسرز کو کیسے انضمام کیا جاتا ہے...',
      originalFormatting: true
    },
    {
      id: 4,
      title: 'Kinematics and Motion Planning',
      urduTitle: 'کنیمیٹکس اور موشن پلاننگ',
      content: 'This chapter covers kinematics and motion planning for robotic systems...',
      urduContent: 'یہ باب روبوٹک سسٹمز کے لیے کنیمیٹکس اور موشن پلاننگ کو احاطہ کرتا ہے...',
      originalFormatting: true
    },
    {
      id: 5,
      title: 'Dynamics and Control Systems',
      urduTitle: 'ڈائنیمکس اور کنٹرول سسٹمز',
      content: 'This chapter explores dynamics and control systems in robotics...',
      urduContent: 'یہ باب روبوٹکس میں ڈائنیمکس اور کنٹرول سسٹمز کا جائزہ لیتا ہے...',
      originalFormatting: true
    },
    {
      id: 6,
      title: 'Sensors and Perception',
      urduTitle: 'سینسرز اور تاثر',
      content: 'This chapter covers sensors and perception systems in robotics...',
      urduContent: 'یہ باب روبوٹکس میں سینسرز اور تاثر کے نظام کو احاطہ کرتا ہے...',
      originalFormatting: true
    },
    {
      id: 7,
      title: 'Machine Learning for Robotics',
      urduTitle: 'روبوٹکس کے لیے مشین لرننگ',
      content: 'This chapter explores machine learning applications in robotics...',
      urduContent: 'یہ باب روبوٹکس میں مشین لرننگ کے اطلاقات کا جائزہ لیتا ہے...',
      originalFormatting: true
    },
    {
      id: 8,
      title: 'Computer Vision and Navigation',
      urduTitle: 'کمپیوٹر وژن اور نیویگیشن',
      content: 'This chapter covers computer vision and navigation systems for robots...',
      urduContent: 'یہ باب روبوٹس کے لیے کمپیوٹر وژن اور نیویگیشن سسٹمز کو احاطہ کرتا ہے...',
      originalFormatting: true
    },
    {
      id: 9,
      title: 'Human-Robot Interaction',
      urduTitle: 'ہیومن-روبوٹ انٹرایکشن',
      content: 'This chapter explores human-robot interaction principles and design...',
      urduContent: 'یہ باب ہیومن-روبوٹ انٹرایکشن کے اصولوں اور ڈیزائن کا جائزہ لیتا ہے...',
      originalFormatting: true
    },
    {
      id: 10,
      title: 'Future of Physical AI and Ethics',
      urduTitle: 'فزکل ای آئی اور اخلاق کا مستقبل',
      content: 'This chapter discusses the future of Physical AI and ethical considerations...',
      urduContent: 'یہ باب فزکل ای آئی کے مستقبل اور اخلاقیات کے مسائل پر تبادلہ خیال کرتا ہے...',
      originalFormatting: true
    }
  ]);

  const [currentChapter, setCurrentChapter] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [translationProgress, setTranslationProgress] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkTheme(prefersDark);

    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkTheme(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const currentChapterData = chapters[currentChapter];

  const translateChapter = async (chapterId) => {
    setTranslationProgress(prev => ({ ...prev, [chapterId]: true }));

    // Simulate translation API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setTranslationProgress(prev => ({ ...prev, [chapterId]: false }));
  };

  return (
    <div className={`${styles.translationContainer} ${isDarkTheme ? styles['dark-theme'] : ''}`}>
      <div className={styles.header}>
        <h1>Urdu Translation</h1>
        <p>Translated book content with preserved formatting and structure</p>
        <button className={styles.exitButton} onClick={() => window.location.href = '/'}>
          Exit to Home
        </button>
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={styles.toggleButton}
        >
          {showTranslation ? 'Show Original' : 'Show Urdu Translation'}
        </button>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={styles.toggleButton}
          style={{ marginLeft: '10px' }}
        >
          {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className={styles.sidebar}>
        <h3>Chapters</h3>
        <ul>
          {chapters.map((chapter, index) => (
            <li
              key={chapter.id}
              className={`${styles.chapterItem} ${index === currentChapter ? styles.active : ''}`}
              onClick={() => setCurrentChapter(index)}
            >
              {showTranslation ? chapter.urduTitle : chapter.title}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.chapterHeader}>
          <h1>{showTranslation ? currentChapterData.urduTitle : currentChapterData.title}</h1>
          <div className={styles.chapterNavigation}>
            <button
              onClick={() => setCurrentChapter(prev => Math.max(0, prev - 1))}
              disabled={currentChapter === 0}
              className={styles.navButton}
            >
              Previous
            </button>
            <span>Chapter {currentChapter + 1} of {chapters.length}</span>
            <button
              onClick={() => setCurrentChapter(prev => Math.min(chapters.length - 1, prev + 1))}
              disabled={currentChapter === chapters.length - 1}
              className={styles.navButton}
            >
              Next
            </button>
          </div>
        </div>

        <div className={styles.chapterContent}>
          {showTranslation ? (
            <div dir="rtl" className={styles.urduContent}>
              <p>{currentChapterData.urduContent}</p>
            </div>
          ) : (
            <div className={styles.originalContent}>
              <p>{currentChapterData.content}</p>
            </div>
          )}

          <div className={styles.translationInfo}>
            <p>
              <strong>Translation Status:</strong> {currentChapterData.urduContent ? 'Translated' : 'Not Translated'}
            </p>
            {!currentChapterData.urduContent && (
              <button
                onClick={() => translateChapter(currentChapterData.id)}
                disabled={translationProgress[currentChapterData.id]}
                className={styles.translateButton}
              >
                {translationProgress[currentChapterData.id] ? 'Translating...' : 'Translate Chapter'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduTranslation;