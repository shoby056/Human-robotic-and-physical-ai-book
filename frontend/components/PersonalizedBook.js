import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import styles from './PersonalizedBook.module.css';

const PersonalizedBook = () => {
  const { user } = useAuth();
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: 'Introduction to Physical AI',
      content: 'This chapter introduces the fundamental concepts of Physical AI and its applications in robotics...',
      personalizedNotes: '',
      highlightedPoints: [],
      images: [],
      personalization: {
        userNotes: '',
        userHighlights: [],
        userImages: []
      }
    },
    {
      id: 2,
      title: 'Humanoid Robotics Fundamentals',
      content: 'This chapter covers the basics of humanoid robotics, including kinematics, dynamics, and control systems...',
      personalizedNotes: '',
      highlightedPoints: [],
      images: [],
      personalization: {
        userNotes: '',
        userHighlights: [],
        userImages: []
      }
    },
    {
      id: 3,
      title: 'Sensor Integration and Perception',
      content: 'This chapter explores how sensors are integrated into robotic systems for perception and environment awareness...',
      personalizedNotes: '',
      highlightedPoints: [],
      images: [],
      personalization: {
        userNotes: '',
        userHighlights: [],
        userImages: []
      }
    }
  ]);

  const [currentChapter, setCurrentChapter] = useState(0);
  const [newNote, setNewNote] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPersonalization, setShowPersonalization] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user's personalization data from localStorage or API
      const savedPersonalization = localStorage.getItem(`book-personalization-${user.username}`);
      if (savedPersonalization) {
        try {
          const parsed = JSON.parse(savedPersonalization);
          setChapters(prev => prev.map((chapter, index) => ({
            ...chapter,
            personalization: parsed[index] || chapter.personalization
          })));
        } catch (e) {
          console.error('Error loading personalization:', e);
        }
      }
    }
  }, [user]);

  const savePersonalization = (updatedChapters) => {
    if (user) {
      localStorage.setItem(`book-personalization-${user.username}`, JSON.stringify(
        updatedChapters.map(chapter => chapter.personalization)
      ));
    }
  };

  const addNote = () => {
    if (!newNote.trim() || !user) return;

    const updatedChapters = [...chapters];
    updatedChapters[currentChapter].personalization.userNotes = newNote;
    setChapters(updatedChapters);
    setNewNote('');
    savePersonalization(updatedChapters);
  };

  const addHighlight = () => {
    if (!newHighlight.trim() || !user) return;

    const updatedChapters = [...chapters];
    updatedChapters[currentChapter].personalization.userHighlights = [
      ...updatedChapters[currentChapter].personalization.userHighlights,
      newHighlight
    ];
    setChapters(updatedChapters);
    setNewHighlight('');
    savePersonalization(updatedChapters);
  };

  const addImage = (e) => {
    if (!selectedImage || !user) return;

    const updatedChapters = [...chapters];
    updatedChapters[currentChapter].personalization.userImages = [
      ...updatedChapters[currentChapter].personalization.userImages,
      URL.createObjectURL(selectedImage)
    ];
    setChapters(updatedChapters);
    setSelectedImage(null);
    savePersonalization(updatedChapters);
  };

  const currentChapterData = chapters[currentChapter];

  return (
    <div className={styles.bookContainer}>
      <div className={styles.sidebar}>
        <h3>Chapters</h3>
        <ul>
          {chapters.map((chapter, index) => (
            <li
              key={chapter.id}
              className={`${styles.chapterItem} ${index === currentChapter ? styles.active : ''}`}
              onClick={() => setCurrentChapter(index)}
            >
              {chapter.title}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.chapterHeader}>
          <h1>{currentChapterData.title}</h1>
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
          <p>{currentChapterData.content}</p>

          {currentChapterData.personalization.userNotes && (
            <div className={styles.personalNote}>
              <h4>Your Note:</h4>
              <p>{currentChapterData.personalization.userNotes}</p>
            </div>
          )}

          {currentChapterData.personalization.userHighlights.length > 0 && (
            <div className={styles.highlightsSection}>
              <h4>Highlighted Points:</h4>
              <ul>
                {currentChapterData.personalization.userHighlights.map((highlight, index) => (
                  <li key={index} className={styles.highlightItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentChapterData.personalization.userImages.length > 0 && (
            <div className={styles.imagesSection}>
              <h4>Your Images:</h4>
              <div className={styles.imageGrid}>
                {currentChapterData.personalization.userImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Personalization ${index + 1}`}
                    className={styles.personalImage}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {user && (
          <div className={styles.personalizationPanel}>
            <h3>Add Personalization</h3>

            <div className={styles.personalizationForm}>
              <div className={styles.formGroup}>
                <label htmlFor="note">Add a personal note:</label>
                <textarea
                  id="note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your personal note here..."
                  className={styles.textarea}
                />
                <button onClick={addNote} className={styles.addButton}>
                  Add Note
                </button>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="highlight">Highlight a key point:</label>
                <input
                  type="text"
                  id="highlight"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="Enter a key point to highlight..."
                  className={styles.input}
                />
                <button onClick={addHighlight} className={styles.addButton}>
                  Add Highlight
                </button>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Add an image:</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  className={styles.fileInput}
                />
                {selectedImage && (
                  <div className={styles.selectedImagePreview}>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className={styles.imagePreview}
                    />
                    <button onClick={addImage} className={styles.addButton}>
                      Add Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className={styles.loginPrompt}>
            <p>Please <a href="/signin">sign in</a> to personalize your book experience.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedBook;