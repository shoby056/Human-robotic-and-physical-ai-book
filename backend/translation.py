from typing import List, Dict, Optional
import requests
import os
from deep_translator import GoogleTranslator
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TranslationService:
    def __init__(self):
        self.supported_languages = {
            'en': 'English',
            'ur': 'Urdu',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'ar': 'Arabic'
        }

    def translate_text(self, text: str, target_lang: str, source_lang: str = 'en') -> str:
        """
        Translate text from source language to target language.

        Args:
            text: The text to translate
            target_lang: The target language code (e.g., 'ur' for Urdu)
            source_lang: The source language code (default 'en' for English)

        Returns:
            The translated text
        """
        try:
            if target_lang not in self.supported_languages:
                raise ValueError(f"Language '{target_lang}' is not supported")

            if source_lang not in self.supported_languages:
                raise ValueError(f"Source language '{source_lang}' is not supported")

            # Using deep-translator for translation
            translator = GoogleTranslator(source=source_lang, target=target_lang)
            translated_text = translator.translate(text)
            return translated_text

        except Exception as e:
            logger.error(f"Translation error: {str(e)}")
            # Return original text if translation fails
            return text

    def translate_content(self, content: str, target_lang: str, source_lang: str = 'en') -> Dict:
        """
        Translate textbook content with metadata.

        Args:
            content: The content to translate
            target_lang: The target language code
            source_lang: The source language code

        Returns:
            Dictionary with translation result and metadata
        """
        try:
            translated_text = self.translate_text(content, target_lang, source_lang)

            return {
                "original_text": content,
                "translated_text": translated_text,
                "source_language": source_lang,
                "target_language": target_lang,
                "translation_quality": "medium",  # Placeholder for quality assessment
                "character_count": len(content),
                "translated_character_count": len(translated_text)
            }
        except Exception as e:
            logger.error(f"Content translation error: {str(e)}")
            return {
                "original_text": content,
                "translated_text": content,  # Return original if translation fails
                "source_language": source_lang,
                "target_language": target_lang,
                "translation_quality": "failed",
                "error": str(e)
            }

    def batch_translate(self, texts: List[str], target_lang: str, source_lang: str = 'en') -> List[Dict]:
        """
        Translate multiple texts at once.

        Args:
            texts: List of texts to translate
            target_lang: The target language code
            source_lang: The source language code

        Returns:
            List of translation results
        """
        results = []
        for text in texts:
            result = self.translate_content(text, target_lang, source_lang)
            results.append(result)
        return results

    def is_valid_language(self, lang_code: str) -> bool:
        """
        Check if the language code is supported.

        Args:
            lang_code: The language code to check

        Returns:
            True if supported, False otherwise
        """
        return lang_code in self.supported_languages

    def get_supported_languages(self) -> Dict[str, str]:
        """
        Get all supported languages.

        Returns:
            Dictionary mapping language codes to language names
        """
        return self.supported_languages.copy()


# Global instance of the translation service
translation_service = TranslationService()


# Example usage and testing
if __name__ == "__main__":
    # Test Urdu translation
    test_text = "Physical AI refers to the branch of artificial intelligence that focuses on enabling machines to interact with the physical world."

    print("Original:", test_text)

    # Translate to Urdu
    urdu_result = translation_service.translate_content(test_text, 'ur')
    print("Urdu Translation:", urdu_result['translated_text'])

    # Translate to Spanish
    spanish_result = translation_service.translate_content(test_text, 'es')
    print("Spanish Translation:", spanish_result['translated_text'])

    # Test batch translation
    texts = [
        "Introduction to Physical AI",
        "ROS 2 Fundamentals",
        "Gazebo Simulation"
    ]

    batch_results = translation_service.batch_translate(texts, 'ur')
    print("\nBatch Translation Results:")
    for i, result in enumerate(batch_results):
        print(f"{texts[i]} -> {result['translated_text']}")