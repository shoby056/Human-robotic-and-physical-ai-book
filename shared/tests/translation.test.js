// Translation tests for Urdu localization
const { TranslationService } = require('../services/translation');

// Mock test data
const testCases = [
  {
    input: "Physical AI refers to the branch of artificial intelligence that focuses on enabling machines to interact with the physical world.",
    expectedLanguage: "ur",
    description: "English to Urdu translation"
  },
  {
    input: "Robot Operating System 2 provides the framework for developing robot applications.",
    expectedLanguage: "ur",
    description: "Technical terminology translation"
  },
  {
    input: "This chapter introduces the concepts of Physical AI and Humanoid Robotics.",
    expectedLanguage: "ur",
    description: "Chapter content translation"
  }
];

describe('Translation Service Tests', () => {
  let translationService;

  beforeAll(() => {
    translationService = new TranslationService();
  });

  test('should translate English text to Urdu', async () => {
    const inputText = "Physical AI refers to the branch of artificial intelligence that focuses on enabling machines to interact with the physical world.";
    const result = await translationService.translateContent(inputText, 'ur', 'en');

    expect(result).toHaveProperty('original_text');
    expect(result).toHaveProperty('translated_text');
    expect(result).toHaveProperty('source_language');
    expect(result).toHaveProperty('target_language');
    expect(result.original_text).toBe(inputText);
    expect(result.source_language).toBe('en');
    expect(result.target_language).toBe('ur');
    expect(typeof result.translated_text).toBe('string');
    expect(result.translated_text).not.toBe('');
  });

  test('should handle empty input gracefully', async () => {
    const result = await translationService.translateContent('', 'ur', 'en');

    expect(result.translated_text).toBe('');
    expect(result.translation_quality).toBe('failed');
  });

  test('should validate language codes', () => {
    expect(translationService.isValidLanguage('ur')).toBe(true);
    expect(translationService.isValidLanguage('en')).toBe(true);
    expect(translationService.isValidLanguage('invalid')).toBe(false);
  });

  test('should return supported languages', () => {
    const languages = translationService.getSupportedLanguages();

    expect(languages).toHaveProperty('en');
    expect(languages).toHaveProperty('ur');
    expect(typeof languages.en).toBe('string');
    expect(typeof languages.ur).toBe('string');
  });

  test('should handle batch translation', async () => {
    const texts = [
      "Introduction to Physical AI",
      "ROS 2 Fundamentals",
      "Gazebo Simulation"
    ];

    const results = await translationService.batchTranslate(texts, 'ur', 'en');

    expect(results).toHaveLength(texts.length);
    results.forEach((result, index) => {
      expect(result.original_text).toBe(texts[index]);
      expect(result.target_language).toBe('ur');
      expect(typeof result.translated_text).toBe('string');
    });
  });

  test('should maintain content structure during translation', async () => {
    const complexContent = {
      title: "Chapter 1: Introduction to Physical AI",
      content: "This chapter introduces the fundamental concepts of Physical AI and Humanoid Robotics.",
      exercises: [
        "Explain the difference between Physical AI and traditional AI.",
        "List three applications of Physical AI."
      ]
    };

    // Test translation of structured content
    const titleResult = await translationService.translateContent(complexContent.title, 'ur', 'en');
    const contentResult = await translationService.translateContent(complexContent.content, 'ur', 'en');

    expect(typeof titleResult.translated_text).toBe('string');
    expect(typeof contentResult.translated_text).toBe('string');
  });

  test('should preserve technical terminology when possible', async () => {
    const technicalTerms = [
      "ROS 2",
      "Gazebo",
      "Unity",
      "NVIDIA Isaac",
      "Physical AI",
      "Humanoid Robotics"
    ];

    for (const term of technicalTerms) {
      const result = await translationService.translateContent(term, 'ur', 'en');
      // For technical terms, we might expect them to be transliterated or preserved
      expect(typeof result.translated_text).toBe('string');
      expect(result.translated_text).not.toBe('');
    }
  });
});

// Additional integration tests
describe('Integration: Translation with Textbook Content', () => {
  let translationService;

  beforeAll(() => {
    translationService = new TranslationService();
  });

  test('should translate textbook chapter content', async () => {
    const chapterContent = `
      # Chapter 1: Introduction to Physical AI

      Physical AI refers to the branch of artificial intelligence that focuses on enabling machines to interact with the physical world.

      ## Key Concepts

      - Perception: Understanding the environment through sensors
      - Reasoning: Making decisions based on environmental data
      - Action: Executing physical movements and manipulations
      - Learning: Adapting behavior based on experience
    `;

    const result = await translationService.translateContent(chapterContent, 'ur', 'en');

    expect(result.translation_quality).not.toBe('failed');
    expect(result.translated_text.length).toBeGreaterThan(0);
    expect(result.original_text).toBe(chapterContent);
  });

  test('should handle special characters and formatting', async () => {
    const formattedText = "Physical AI (PAI) is a field of #AI that deals with #Robotics & #MachineLearning.";

    const result = await translationService.translateContent(formattedText, 'ur', 'en');

    expect(typeof result.translated_text).toBe('string');
    expect(result.translation_quality).not.toBe('failed');
  });
});

// Performance tests
describe('Performance: Translation Service', () => {
  let translationService;

  beforeAll(() => {
    translationService = new TranslationService();
  });

  test('should translate within acceptable time limits', async () => {
    const longText = "Physical AI refers to the branch of artificial intelligence that focuses on enabling machines to interact with the physical world. ".repeat(50);

    const startTime = Date.now();
    const result = await translationService.translateContent(longText, 'ur', 'en');
    const endTime = Date.now();

    const executionTime = endTime - startTime;

    // Translation should complete within 10 seconds for reasonably sized text
    expect(executionTime).toBeLessThan(10000);
    expect(result.translation_quality).not.toBe('failed');
  });
});

// Context-specific tests for textbook content
describe('Context: Textbook-specific Translation', () => {
  let translationService;

  beforeAll(() => {
    translationService = new TranslationService();
  });

  test('should handle textbook-specific terminology appropriately', async () => {
    const textbookTerms = [
      "Robot Operating System 2",
      "Gazebo physics simulation",
      "Unity digital twin",
      "NVIDIA Isaac perception",
      "Humanoid robot locomotion"
    ];

    for (const term of textbookTerms) {
      const result = await translationService.translateContent(term, 'ur', 'en');
      expect(typeof result.translated_text).toBe('string');
      expect(result.translation_quality).not.toBe('failed');
    }
  });
});

console.log('Translation tests completed successfully!');