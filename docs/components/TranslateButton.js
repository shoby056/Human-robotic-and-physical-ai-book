import React, { useState, useEffect } from 'react';
import styles from './TranslateButton.module.css';

const TranslateButton = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ur', name: 'Urdu' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectLanguage = async (langCode) => {
    if (langCode === currentLanguage) {
      setShowDropdown(false);
      return;
    }

    setIsTranslating(true);

    try {
      // In a real implementation, this would call the translation API
      // For now, we'll just simulate the language change
      console.log(`Translating to ${langCode}...`);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setCurrentLanguage(langCode);
      setShowDropdown(false);

      // In a real implementation, you would:
      // 1. Get the current page content
      // 2. Send it to the backend translation service
      // 3. Update the page with translated content
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.translate-component')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`translate-component ${styles.translateContainer}`}>
      <button
        className={`${styles.translateButton} ${isTranslating ? styles.translating : ''}`}
        onClick={toggleDropdown}
        aria-label="Change language"
        title={`Current language: ${languages.find(l => l.code === currentLanguage)?.name}`}
      >
        {isTranslating ? (
          <span className={styles.spinner}>↻</span>
        ) : (
          <span className={styles.languageCode}>{currentLanguage.toUpperCase()}</span>
        )}
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span>Select Language</span>
          </div>
          <ul className={styles.languageList}>
            {languages.map((language) => (
              <li
                key={language.code}
                className={`${styles.languageItem} ${
                  currentLanguage === language.code ? styles.active : ''
                }`}
                onClick={() => selectLanguage(language.code)}
              >
                <span className={styles.languageName}>
                  {language.name}
                </span>
                {currentLanguage === language.code && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TranslateButton;