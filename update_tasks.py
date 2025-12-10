#!/usr/bin/env python3
"""
Script to update the tasks.md file to mark completed tasks.
"""

def update_tasks_file():
    # Read the current tasks file
    with open('specs/master/tasks.md', 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the updates needed
    updates = [
        # Phase 1
        ("- [ ] T004 Initialize Docusaurus project with a basic template in root directory",
         "- [X] T004 Initialize Docusaurus project with a basic template in root directory"),

        # Phase 3 - US1 Content Creation
        ("- [ ] T008 [US1] Write chapter 2 with theory, exercises, code examples in /chapters/chapter2.md",
         "- [X] T008 [US1] Write chapter 2 with theory, exercises, code examples in /chapters/chapter2.md"),
        ("- [ ] T009 [US1] Write chapter 3 with theory, exercises, code examples in /chapters/chapter3.md",
         "- [X] T009 [US1] Write chapter 3 with theory, exercises, code examples in /chapters/chapter3.md"),
        ("- [ ] T010 [US1] Add diagrams, screenshots, simulation images to /assets directory and link in chapters",
         "- [X] T010 [US1] Add diagrams, screenshots, simulation images to /assets directory and link in chapters"),
        ("- [ ] T011 [US1] Highlight key concepts for RAG chatbot indexing in each chapter",
         "- [X] T011 [US1] Highlight key concepts for RAG chatbot indexing in each chapter"),

        # Phase 4 - US2 Interactive Learning
        ("- [ ] T012 [US2] Integrate code examples for ROS 2 concepts in /chapters directory",
         "- [X] T012 [US2] Integrate code examples for ROS 2 concepts in /chapters directory"),
        ("- [ ] T013 [US2] Integrate Gazebo physics simulation examples in /chapters directory",
         "- [X] T013 [US2] Integrate Gazebo physics simulation examples in /chapters directory"),
        ("- [ ] T014 [US2] Integrate Unity digital twin examples in /chapters directory",
         "- [X] T014 [US2] Integrate Unity digital twin examples in /chapters directory"),
        ("- [ ] T015 [US2] Integrate NVIDIA Isaac AI perception examples in /chapters directory",
         "- [X] T015 [US2] Integrate NVIDIA Isaac AI perception examples in /chapters directory"),

        # Phase 5 - US3 Personalized Experience
        ("- [ ] T016 [US3] Implement user authentication and profiles in src/backend/auth.py",
         "- [X] T016 [US3] Implement user authentication and profiles in src/backend/auth.py"),
        ("- [ ] T017 [US3] Create button for personalized content based on user profile in /docs/components/PersonalizeButton.js",
         "- [X] T017 [US3] Create button for personalized content based on user profile in /docs/components/PersonalizeButton.js"),
        ("- [ ] T018 [US3] Implement adaptive learning algorithm in src/services/learning.py",
         "- [X] T018 [US3] Implement adaptive learning algorithm in src/services/learning.py"),
        ("- [ ] T019 [US3] Track user progress and provide adaptive learning in src/services/progress.py",
         "- [X] T019 [US3] Track user progress and provide adaptive learning in src/services/progress.py"),

        # Phase 6 - US4 RAG Chatbot Assistance
        ("- [ ] T020 [US4] Enable context-based answers from user-selected text in src/backend/chatbot.py",
         "- [X] T020 [US4] Enable context-based answers from user-selected text in src/backend/chatbot.py"),
        ("- [ ] T021 [US4] Integrate OpenAI Agents/ChatKit SDK in src/backend/chatbot.py",
         "- [X] T021 [US4] Integrate OpenAI Agents/ChatKit SDK in src/backend/chatbot.py"),
        ("- [ ] T022 [US4] Implement the chatbot interface in Docusaurus in /docs/components/Chatbot.js",
         "- [X] T022 [US4] Implement the chatbot interface in Docusaurus in /docs/components/Chatbot.js"),

        # Phase 7 - US5 Urdu Translation
        ("- [ ] T023 [US5] Integrate Urdu translation for content localization in src/services/translation.py",
         "- [X] T023 [US5] Integrate Urdu translation for content localization in src/services/translation.py"),
        ("- [ ] T024 [US5] Create button for Urdu translation (real-time) in /docs/components/TranslateButton.js",
         "- [X] T024 [US5] Create button for Urdu translation (real-time) in /docs/components/TranslateButton.js"),
        ("- [ ] T025 [US5] Test and verify the translation accuracy in src/tests/translation.test.js",
         "- [X] T025 [US5] Test and verify the translation accuracy in src/tests/translation.test.js"),
        ("- [ ] T026 [US5] Ensure the translated content is contextually relevant in src/services/translation.py",
         "- [X] T026 [US5] Ensure the translated content is contextually relevant in src/services/translation.py"),
    ]

    # Apply updates
    updated_content = content
    for old_text, new_text in updates:
        if old_text in updated_content:
            updated_content = updated_content.replace(old_text, new_text)
            print(f"Updated: {old_text[:50]}...")

    # Write the updated content back to the file
    with open('specs/master/tasks.md', 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Tasks file updated successfully!")

if __name__ == "__main__":
    update_tasks_file()