import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter5Page = () => {
  const chapter = {
    id: 5,
    title: 'Sensors and Perception',
    urduTitle: 'سینسرز اور تاثر',
    content: `# Chapter 5 - Sensors and Perception

## Overview

This chapter covers the various sensors used in robotics and how they enable perception of the environment. Sensors are crucial for robots to understand and interact with their surroundings, forming the basis for intelligent behavior.

## Learning Objectives

By the end of this chapter, you will be able to:
- Understand different types of robotic sensors
- Implement sensor fusion techniques
- Apply computer vision algorithms
- Design perception systems for robots

## Types of Sensors

### Proprioceptive Sensors

These sensors measure internal robot state:
- Encoders: Measure joint angles and wheel rotations
- Inertial Measurement Units (IMUs): Measure acceleration and angular velocity
- Force/Torque sensors: Measure forces at contact points

### Exteroceptive Sensors

These sensors measure the external environment:
- Range sensors: LIDAR, ultrasonic, infrared
- Cameras: RGB, stereo, thermal
- Tactile sensors: Detect contact and pressure

## Computer Vision in Robotics

Computer vision enables robots to interpret visual information from cameras. Key techniques include:

### Feature Detection and Matching

Detecting distinctive features in images and matching them across different views:
- SIFT (Scale-Invariant Feature Transform)
- SURF (Speeded Up Robust Features)
- ORB (Oriented FAST and Rotated BRIEF)

### Object Recognition

Identifying and classifying objects in the environment using:
- Template matching
- Deep learning approaches
- Bag-of-words models

### Simultaneous Localization and Mapping (SLAM)

SLAM allows robots to build a map of an unknown environment while simultaneously localizing themselves within it.

## Sensor Fusion

Sensor fusion combines data from multiple sensors to improve accuracy and robustness. Common approaches include:
- Kalman filters
- Particle filters
- Bayesian networks

## Chapter Summary

This chapter covered the essential role of sensors in robotics and techniques for environmental perception. Proper sensor selection and integration are critical for robot autonomy.

## Exercises

1. Implement a simple object detection algorithm using OpenCV.
2. Design a sensor fusion system combining LIDAR and camera data.
3. Create a SLAM simulation for a mobile robot.`,
    urduContent: `# باب 5 - سینسرز اور تاثر

## جائزہ

یہ باب روبوٹکس میں استعمال ہونے والے مختلف سینسرز اور ان کے ماحول کو سمجھنے کے طریقے کو احاطہ کرتا ہے۔ سینسرز روبوٹس کے لیے ماحول کو سمجھنے اور اس کے ساتھ تعامل کرنے کے لیے اہم ہیں، جو ذہین رویے کے لیے بنیاد فراہم کرتے ہیں۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- روبوٹک سینسرز کی مختلف اقسام کو سمجھنا
- سینسر فیوژن کی تکنیکوں کو نافذ کرنا
- کمپیوٹر وژن الگورتھم کو نافذ کرنا
- روبوٹس کے لیے تاثر کے نظام ڈیزائن کرنا

## سینسرز کی اقسام

### پروپریوسیپٹو سینسرز

یہ سینسرز روبوٹ کی اندرونی حالت کو پیمائش کرتے ہیں:
- انکوڈرز: مشترکہ اینگلز اور پہیوں کے گردش کو پیمائش کرتے ہیں
- انیشیل میزورمنٹ یونٹس (IMUs): تیزی اور زاویہ وار رفتار کو پیمائش کرتے ہیں
- قوت/ٹورک سینسرز: رابطے کے نقاط پر قوتوں کو پیمائش کرتے ہیں

### ایکسٹروسیپٹو سینسرز

یہ سینسرز بیرونی ماحول کو پیمائش کرتے ہیں:
- رینج سینسرز: LIDAR، الٹرا سونک، انفراریڈ
- کیمرے: RGB، اسٹیریو، تھرمل
- ٹیکٹائل سینسرز: رابطہ اور دباؤ کا پتہ لگاتے ہیں

## روبوٹکس میں کمپیوٹر وژن

کمپیوٹر وژن روبوٹس کو کیمرے سے دوائی معلومات کی تشریح کرنے کے قابل بناتا ہے۔ اہم تکنیکیں شامل ہیں:

### فیچر ڈیٹیکشن اور میچنگ

تصاویر میں متفرد فیچرز کو تلاش کرنا اور انہیں مختلف نظروں میں میچ کرنا:
- SIFT (اسکیل-انویرینٹ فیچر ٹرانسفارم)
- SURF (سپیڈیڈ اپ روبسٹ فیچرز)
- ORB (اورینٹیڈ FAST اور روٹیٹڈ BRIEF)

### آبجیکٹ ریکوگنیشن

ماحول میں آبجیکٹس کی پہچان اور درجہ بندی کرنا:
- ٹیمپلیٹ میچنگ
- ڈیپ لرننگ کے طریقے
- بیگ-آف-وڈز ماڈلز

### سیملٹینیس لوکلائزیشن اور میپنگ (SLAM)

SLAM روبوٹس کو ایک نامعلوم ماحول کا نقشہ تیار کرنے کی اجازت دیتا ہے جبکہ اسی وقت اندر اپنی مقام کی وضاحت کرتا ہے۔

## سینسر فیوژن

سینسر فیوژن متعدد سینسرز سے ڈیٹا کو ملانے کے ذریعے درستگی اور مضبوطی میں اضافہ کرتا ہے۔ عام طریقے میں شامل ہیں:
- کیلمین فلٹرز
- پارٹیکل فلٹرز
- بےزیئن نیٹ ورکس

## باب کا خلاصہ

اس باب نے روبوٹکس میں سینسرز کے اہم کردار اور ماحول کے تاثر کی تکنیکوں کو احاطہ کیا۔ مناسب سینسر کا انتخاب اور انضمام روبوٹ کی خودمختاری کے لیے اہم ہے۔

## مشقیں

1. OpenCV کا استعمال کرتے ہوئے ایک سادہ آبجیکٹ ڈیٹیکشن الگورتھم نافذ کریں۔
2. LIDAR اور کیمرے کے ڈیٹا کو ملانے والا ایک سینسر فیوژن سسٹم ڈیزائن کریں۔
3. ایک موبائل روبوٹ کے لیے SLAM سیمولیشن تیار کریں۔`
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
            <a href="/urdu-chapter-4">← Previous: Chapter 4</a>
            <a href="/urdu-chapter-6">Next: Chapter 6 →</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter5Page;