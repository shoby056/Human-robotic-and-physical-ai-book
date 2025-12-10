#!/usr/bin/env python3
"""
Script to update module files with proper frontmatter.
"""

import os

def update_module_file(filepath, title, sidebar_label):
    # Read the current content
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create new content with frontmatter (using quotes for values with special characters)
    new_content = f"""---
title: "{title}"
sidebar_label: "{sidebar_label}"
---

{content}"""

    # Write the updated content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Updated: {filepath}")

def main():
    # Define module information
    modules = [
        {
            "file": "docs/modules/module1-ros2-fundamentals.md",
            "title": "Module 1 - ROS 2 Fundamentals",
            "sidebar_label": "Module 1: ROS 2 Fundamentals"
        },
        {
            "file": "docs/modules/module2-digital-twin.md",
            "title": "Module 2 - Digital Twin (Gazebo & Unity)",
            "sidebar_label": "Module 2: Digital Twin (Gazebo & Unity)"
        },
        {
            "file": "docs/modules/module3-nvidia-isaac.md",
            "title": "Module 3 - NVIDIA Isaac AI & Perception",
            "sidebar_label": "Module 3: NVIDIA Isaac AI & Perception"
        },
        {
            "file": "docs/modules/module4-vla.md",
            "title": "Module 4 - Vision-Language-Action (VLA)",
            "sidebar_label": "Module 4: Vision-Language-Action (VLA)"
        },
        {
            "file": "docs/modules/capstone-project.md",
            "title": "Capstone Project - Autonomous Humanoid Robot",
            "sidebar_label": "Capstone Project: Autonomous Humanoid Robot"
        }
    ]

    for module in modules:
        filepath = f"C:/Users/Laptronics.co/Desktop/Hackathon1/{module['file']}"
        if os.path.exists(filepath):
            update_module_file(filepath, module['title'], module['sidebar_label'])
        else:
            print(f"File does not exist: {filepath}")

if __name__ == "__main__":
    main()