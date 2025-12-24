import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Helper function to extract original URL from Google Translate
  const getOriginalUrlFromTranslate = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const originalUrl = urlParams.get('u');
    return originalUrl ? decodeURIComponent(originalUrl) : null;
  };

  // Determine the current language based on URL
  useEffect(() => {
    // Check if we're on a Google Translate URL
    if (window.location.hostname.includes('translate.google.com')) {
      // Try to get the original URL from the 'u' parameter
      const originalUrl = getOriginalUrlFromTranslate();

      // If we're on a Google Translate page and the original URL contains our site,
      // then we're viewing a translated version of our site
      if (originalUrl && originalUrl.includes(window.location.origin)) {
        setSelectedLanguage('ur');
      } else {
        setSelectedLanguage('en');
      }
    } else {
      // We're on the original site, so it's in English
      setSelectedLanguage('en');
    }
  }, [location]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ur', name: 'اردو' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (langCode) => {
    if (langCode === 'ur') {
      // Redirect to Google Translate with current page URL
      const currentUrl = window.location.href;
      const encodedUrl = encodeURIComponent(currentUrl);

      // Construct the Google Translate URL with the current page URL
      // Using sl=en (source language), tl=ur (target language), hl=ur (home language), u=encoded URL
      const translatedUrl = `https://translate.google.com/translate?sl=en&tl=ur&hl=ur&u=${encodedUrl}`;

      // Use window.location.replace to redirect without breaking browser history
      window.location.replace(translatedUrl);
    } else {
      // Return to original English URL (remove any Google Translate parameters)
      if (window.location.hostname.includes('translate.google.com')) {
        // We're currently on Google Translate, extract the original URL from the 'u' parameter
        const originalUrl = getOriginalUrlFromTranslate();

        if (originalUrl) {
          // Redirect to the original URL
          window.location.replace(originalUrl);
        } else {
          // Fallback to homepage if original URL not found in 'u' parameter
          window.location.replace(window.location.origin);
        }
      } else {
        // Already on English site, just update state and close dropdown
        setSelectedLanguage('en');
        setIsOpen(false);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguageName = languages.find(lang => lang.code === selectedLanguage)?.name;

  return (
    <div className={styles.languageSwitcherContainer} ref={dropdownRef}>
      <button
        className={styles.languageButton}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentLanguageName}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {languages.map((language) => (
            <li key={language.code}>
              <button
                className={`${styles.dropdownItem} ${selectedLanguage === language.code ? styles.selected : ''}`}
                onClick={() => {
                  handleLanguageSelect(language.code);
                }}
              >
                {language.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;