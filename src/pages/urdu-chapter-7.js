import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter7Page = () => {
  const chapter = {
    id: 7,
    title: 'Computer Vision and Navigation',
    urduTitle: 'کمپیوٹر وژن اور نیویگیشن',
    content: `# Chapter 7 - Computer Vision and Navigation

## Overview

This chapter covers computer vision techniques and navigation algorithms essential for autonomous robots. Computer vision enables robots to interpret visual information, while navigation algorithms help them move efficiently through their environment.

## Learning Objectives

By the end of this chapter, you will be able to:
- Implement computer vision algorithms for robot perception
- Apply path planning algorithms for robot navigation
- Use SLAM techniques for mapping and localization
- Design vision-based control systems

## Computer Vision Fundamentals

Computer vision in robotics involves processing and analyzing visual data to extract meaningful information about the environment.

### Image Processing

Key image processing techniques include:
- Filtering and noise reduction
- Edge detection
- Feature extraction
- Image segmentation

### Object Detection and Recognition

Robots use various techniques to identify objects in their environment:
- Template matching
- Feature-based detection (SIFT, SURF, ORB)
- Deep learning-based approaches (CNNs, YOLO)

## Navigation Algorithms

### Path Planning

Path planning algorithms determine optimal routes for robots to follow:

#### Global Path Planning
- A* algorithm
- Dijkstra's algorithm
- Visibility graphs
- Voronoi diagrams

#### Local Path Planning
- Dynamic Window Approach (DWA)
- Vector Field Histogram (VFH)
- Artificial Potential Fields

### Simultaneous Localization and Mapping (SLAM)

SLAM enables robots to build maps of unknown environments while simultaneously determining their location within those maps.

#### Types of SLAM
- Visual SLAM (using cameras)
- Laser SLAM (using LIDAR)
- Multi-sensor SLAM (combining various sensors)

## Visual Navigation

Visual navigation combines computer vision with navigation algorithms to enable robots to move based on visual information.

### Visual Odometry

Visual odometry estimates robot motion by analyzing changes in visual input between consecutive frames.

### Obstacle Detection and Avoidance

Vision-based obstacle detection helps robots navigate safely by identifying and avoiding obstacles in their path.

## Chapter Summary

This chapter covered essential computer vision and navigation techniques for autonomous robots. These technologies are fundamental for enabling robots to perceive their environment and navigate effectively.

## Exercises

1. Implement a simple object detection system for robot navigation.
2. Apply the A* algorithm to plan paths in a grid-based environment.
3. Design a visual SLAM system using camera input.`,
    urduContent: `# باب 7 - کمپیوٹر وژن اور نیویگیشن

## جائزہ

یہ باب خود مختار روبوٹس کے لیے ضروری کمپیوٹر وژن کی تکنیکوں اور نیویگیشن الگورتھم کو احاطہ کرتا ہے۔ کمپیوٹر وژن روبوٹس کو دوائی معلومات کی تشریح کرنے کے قابل بناتا ہے، جبکہ نیویگیشن الگورتھم انہیں اپنے ماحول میں مؤثر طریقے سے حرکت کرنے میں مدد کرتے ہیں۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- روبوٹ تاثر کے لیے کمپیوٹر وژن الگورتھم نافذ کرنا
- روبوٹ نیویگیشن کے لیے راستہ منصوبہ بندی الگورتھم لاگو کرنا
- میپنگ اور لوکلائزیشن کے لیے SLAM کی تکنیکوں کو استعمال کرنا
- وژن-بیسڈ کنٹرول سسٹم ڈیزائن کرنا

## کمپیوٹر وژن کے بنیادیات

روبوٹکس میں کمپیوٹر وژن دوائی ڈیٹا کو پروسیس اور تجزیہ کرنے میں ملوث ہے تاکہ ماحول کے بارے میں معنی خیز معلومات حاصل کی جا سکے۔

### امیج پروسیسنگ

اہم امیج پروسیسنگ کی تکنیکیں شامل ہیں:
- فلٹرنگ اور شور کی کمی
- ایج ڈیٹیکشن
- فیچر ایکسٹریکشن
- امیج سیگمینٹیشن

### آبجیکٹ ڈیٹیکشن اور ریکوگنیشن

روبوٹس اپنے ماحول میں چیزوں کی پہچان کے لیے مختلف تکنیکوں کا استعمال کرتے ہیں:
- ٹیمپلیٹ میچنگ
- فیچر-بیسڈ ڈیٹیکشن (SIFT، SURF، ORB)
- ڈیپ لرننگ-بیسڈ طریقے (CNNs، YOLO)

## نیویگیشن الگورتھم

### راستہ منصوبہ بندی

راستہ منصوبہ بندی الگورتھم روبوٹس کے لیے مثالی راستے کا تعین کرتے ہیں:

#### عالمی راستہ منصوبہ بندی
- A* الگورتھم
- Dijkstra کا الگورتھم
- ویژی بیلیٹی گرافس
- ورونوی ڈائیاگرامس

#### مقامی راستہ منصوبہ بندی
- ڈائنامک ونڈو اپروچ (DWA)
- ویکٹر فیلڈ ہسٹوگرام (VFH)
- آرٹیفیشل پوٹینشل فیلڈز

### سیملٹینیس لوکلائزیشن اور میپنگ (SLAM)

SLAM روبوٹس کو نامعلوم ماحول کے نقشے تیار کرنے کی اجازت دیتا ہے جبکہ اسی وقت اندر ان نقشہ جات کے اندر اپنی مقام کا تعین کرتا ہے۔

#### SLAM کی اقسام
- ویژوئل SLAM (کیمرے استعمال کرتے ہوئے)
- لیزر SLAM (LIDAR استعمال کرتے ہوئے)
- ملٹی-سینسر SLAM (مختلف سینسرز کو جوڑتے ہوئے)

## ویژوئل نیویگیشن

ویژوئل نیویگیشن کمپیوٹر وژن کو نیویگیشن الگورتھم کے ساتھ ملاتا ہے تاکہ روبوٹس کو بصری معلومات کی بنیاد پر حرکت کرنے کے قابل بنایا جا سکے۔

### ویژوئل اوڈومیٹری

ویژوئل اوڈومیٹری روبوٹ کی حرکت کا تخمینہ لگاتا ہے متوالیہ فریموں کے درمیان بصری ان پٹ میں تبدیلیوں کا تجزیہ کرتے ہوئے۔

### رکاوٹ کا پتہ لگانا اور اس سے بچنا

بصری بیسڈ رکاوٹ کا پتہ لگانا روبوٹس کو محفوظ طریقے سے نیویگیٹ کرنے میں مدد کرتا ہے ان کے راستے میں رکاوٹوں کی شناخت اور ان سے بچنے کے ذریعے۔

## باب کا خلاصہ

اس باب نے خود مختار روبوٹس کے لیے اہم کمپیوٹر وژن اور نیویگیشن کی تکنیکوں کو احاطہ کیا۔ یہ ٹیکنالوجیز روبوٹس کو اپنے ماحول کو سمجھنے اور مؤثر طریقے سے نیویگیٹ کرنے کے قابل بنانے کے لیے بنیادی ہیں۔

## مشقیں

1. روبوٹ نیویگیشن کے لیے ایک سادہ آبجیکٹ ڈیٹیکشن سسٹم نافذ کریں۔
2. A* الگورتھم کو گرڈ-بیسڈ ماحول میں راستے منصوبہ بندی کے لیے لاگو کریں۔
3. کیمرے کے ان پٹ کا استعمال کرتے ہوئے ایک بصری SLAM سسٹم ڈیزائن کریں۔`
  };

  return (
    <div className={styles.translationContainer}>
      <div className={styles.header}>
        <h1>{chapter.urduTitle}</h1>
        <p>Chapter {chapter.id} - Urdu Translation</p>
        <button className={styles.exitButton} onClick={() => window.location.href = '/'}>
          Exit to Home
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.chapterContent}>
          <div dir="rtl" className={styles.urduContent}>
            <p>{chapter.urduContent}</p>
          </div>

          <div className={styles.navigationLinks}>
            <a href="/urdu-chapter-6">← Previous: Chapter 6</a>
            <a href="/urdu-chapter-8">Next: Chapter 8 →</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter7Page;