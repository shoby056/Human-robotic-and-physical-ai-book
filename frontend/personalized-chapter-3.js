import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import styles from '../components/PersonalizedBook.module.css';

const PersonalizedChapter3Page = () => {
  const { user } = useAuth();
  const [chapterData, setChapterData] = useState({
    id: 3,
    title: 'Sensor Integration and Perception',
    content: 'This chapter explores how sensors are integrated into robotic systems for perception and environment awareness...',
    personalizedNotes: '',
    highlightedPoints: [],
    userNotes: '',
    userHighlights: [],
    userImages: []
  });

  const [newNote, setNewNote] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      // Load user's personalization data from localStorage
      const savedPersonalization = localStorage.getItem(`chapter-3-personalization-${user.username}`);
      if (savedPersonalization) {
        try {
          const parsed = JSON.parse(savedPersonalization);
          setChapterData(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error('Error loading personalization:', e);
        }
      }
    }
  }, [user]);

  const savePersonalization = (updatedData) => {
    if (user) {
      localStorage.setItem(`chapter-3-personalization-${user.username}`, JSON.stringify(updatedData));
    }
  };

  const addNote = () => {
    if (!newNote.trim() || !user) return;

    const updatedData = {
      ...chapterData,
      userNotes: newNote
    };
    setChapterData(updatedData);
    setNewNote('');
    savePersonalization(updatedData);
  };

  const addHighlight = () => {
    if (!newHighlight.trim() || !user) return;

    const updatedData = {
      ...chapterData,
      userHighlights: [...chapterData.userHighlights, newHighlight]
    };
    setChapterData(updatedData);
    setNewHighlight('');
    savePersonalization(updatedData);
  };

  const addImage = (e) => {
    if (!selectedImage || !user) return;

    const updatedData = {
      ...chapterData,
      userImages: [...chapterData.userImages, URL.createObjectURL(selectedImage)]
    };
    setChapterData(updatedData);
    setSelectedImage(null);
    savePersonalization(updatedData);
  };

  return (
    <div className={styles.bookContainer}>
      <div className={styles.content}>
        <div className={styles.chapterHeader}>
          <h1>{chapterData.title}</h1>
          <div className={styles.navigationLinks}>
            <a href="/personalized">← Back to Personalized Book Index</a>
          </div>
        </div>

        <div className={styles.chapterContent}>
          <p>{chapterData.content}</p>

          {chapterData.userNotes && (
            <div className={styles.personalNote}>
              <h4>Your Note:</h4>
              <p>{chapterData.userNotes}</p>
            </div>
          )}

          {chapterData.userHighlights.length > 0 && (
            <div className={styles.highlightsSection}>
              <h4>Highlighted Points:</h4>
              <ul>
                {chapterData.userHighlights.map((highlight, index) => (
                  <li key={index} className={styles.highlightItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {chapterData.userImages.length > 0 && (
            <div className={styles.imagesSection}>
              <h4>Your Images:</h4>
              <div className={styles.imageGrid}>
                {chapterData.userImages.map((image, index) => (
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
            <p>Please <a href="/signin">sign in</a> to personalize this chapter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedChapter3Page;