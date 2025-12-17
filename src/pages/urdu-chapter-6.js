import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter6Page = () => {
  const chapter = {
    id: 6,
    title: 'Machine Learning for Robotics',
    urduTitle: 'روبوٹکس کے لیے مشین لرننگ',
    content: `# Chapter 6 - Machine Learning for Robotics

## Overview

This chapter explores the application of machine learning techniques in robotics. Machine learning enables robots to learn from experience, adapt to new situations, and improve their performance over time without explicit programming.

## Learning Objectives

By the end of this chapter, you will be able to:
- Apply supervised learning techniques to robotic problems
- Implement reinforcement learning for robot control
- Use deep learning for perception tasks
- Design learning algorithms for robot behavior

## Supervised Learning in Robotics

Supervised learning involves training models with labeled data to make predictions. In robotics, this can be used for:
- Object recognition and classification
- Robot localization and mapping
- Predictive maintenance
- Human-robot interaction modeling

### Support Vector Machines (SVMs)

SVMs are effective for classification tasks, particularly in distinguishing between different types of objects or surfaces in robot perception.

### Neural Networks

Neural networks, especially deep networks, have revolutionized robot perception and control by learning complex patterns from raw sensor data.

## Unsupervised Learning

Unsupervised learning discovers patterns in data without labeled examples. Applications include:
- Clustering similar robot behaviors
- Anomaly detection in robot performance
- Feature learning from sensor data

## Reinforcement Learning

Reinforcement learning trains robots through trial and error, using rewards and penalties to guide behavior toward desired outcomes.

### Q-Learning

Q-learning is a model-free reinforcement learning technique that learns the value of actions in particular states.

### Deep Q-Networks (DQN)

DQNs combine deep learning with Q-learning to handle high-dimensional state spaces.

## Deep Learning in Robotics

Deep learning has transformed robotics, particularly in:
- Computer vision for object detection and recognition
- Natural language processing for human-robot interaction
- Control systems for complex manipulation tasks

## Chapter Summary

This chapter covered the essential role of machine learning in modern robotics. ML techniques enable robots to adapt, learn, and improve their performance in dynamic environments.

## Exercises

1. Implement a neural network for object classification using robot sensor data.
2. Design a reinforcement learning algorithm for robot navigation.
3. Apply clustering techniques to identify different robot behaviors.`,
    urduContent: `# باب 6 - روبوٹکس کے لیے مشین لرننگ

## جائزہ

یہ باب روبوٹکس میں مشین لرننگ کی تکنیکوں کے اطلاق کا جائزہ لیتا ہے۔ مشین لرننگ روبوٹس کو تجربے سے سیکھنے، نئی صورتحال میں مطابقت رکھنے، اور بے ترتیب پروگرامنگ کے بغیر وقت کے ساتھ اپنی کارکردگی میں بہتری لانے کے قابل بناتا ہے۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- روبوٹک مسائل پر نگرانی شدہ لرننگ کی تکنیکوں کو لاگو کرنا
- روبوٹ کنٹرول کے لیے مضبوط لرننگ نافذ کرنا
- تاثر کے کاموں کے لیے گہری لرننگ کا استعمال کرنا
- روبوٹ کے رویے کے لیے لرننگ الگورتھم ڈیزائن کرنا

## روبوٹکس میں نگرانی شدہ لرننگ

نگرانی شدہ لرننگ لیبل والے ڈیٹا کے ساتھ ماڈلز کو تربیت دینے میں ملوث ہے تاکہ پیشن گوئی کی جا سکے۔ روبوٹکس میں اس کا استعمال ہو سکتا ہے:
- آبجیکٹ کی پہچان اور درجہ بندی
- روبوٹ کی لوکلائزیشن اور میپنگ
- پیشن گوئی والی مینٹیننس
- ہیومن-روبوٹ انٹرایکشن ماڈلنگ

### سپورٹ ویکٹر مشینز (SVMs)

SVMs درجہ بندی کے کاموں کے لیے مؤثر ہیں، خاص طور پر روبوٹ کے تاثر میں مختلف اقسام کی چیزوں یا سطحوں کو الگ کرنے میں۔

### نیورل نیٹ ورکس

نیورل نیٹ ورکس، خاص طور پر گہرے نیٹ ورکس، نے روبوٹ کے تاثر اور کنٹرول کو بدل دیا ہے اصل سینسر ڈیٹا سے پیچیدہ نمونوں کو سیکھنے کے ذریعے۔

## غیر نگرانی شدہ لرننگ

غیر نگرانی شدہ لرننگ لیبل والی مثالوں کے بغیر ڈیٹا میں نمونے تلاش کرتا ہے۔ اطلاقات میں شامل ہیں:
- مماثل روبوٹ کے رویوں کو کلسٹر کرنا
- روبوٹ کی کارکردگی میں اینوملی کا پتہ لگانا
- سینسر ڈیٹا سے فیچر لرننگ

## مضبوط لرننگ

مضبوط لرننگ آزمائش اور غلطی کے ذریعے روبوٹس کو تربیت دیتا ہے، مطلوبہ نتائج کی طرف رویے کی رہنمائی کے لیے انعام اور سزا کا استعمال کرتے ہوئے۔

### Q-لرننگ

Q-لرننگ ایک ماڈل فری مضبوط لرننگ کی تکنیک ہے جو خاص حالت میں اعمال کی قدر کو سیکھتا ہے۔

### گہرے Q-نیٹ ورکس (DQN)

DQN گہری لرننگ کو Q-لرننگ کے ساتھ ملانے کے ذریعے زیادہ طاقت والی حالت کی جگہوں کو سنبھالنے کے لیے ہے۔

## روبوٹکس میں گہری لرننگ

گہری لرننگ نے روبوٹکس کو تبدیل کر دیا ہے، خاص طور پر:
- آبجیکٹ کے پتہ لگانے اور پہچان کے لیے کمپیوٹر وژن میں
- ہیومن-روبوٹ انٹرایکشن کے لیے قدرتی زبان کی پروسیسنگ میں
- پیچیدہ مینوپولیشن کاموں کے لیے کنٹرول سسٹمز میں

## باب کا خلاصہ

اس باب نے جدید روبوٹکس میں مشین لرننگ کے اہم کردار کو احاطہ کیا۔ ایم ایل کی تکنیکیں روبوٹس کو مطابقت، سیکھنے، اور متحرک ماحول میں اپنی کارکردگی میں بہتری لانے کے قابل بناتی ہیں۔

## مشقیں

1. روبوٹ سینسر ڈیٹا کا استعمال کرتے ہوئے آبجیکٹ کی درجہ بندی کے لیے ایک نیورل نیٹ ورک نافذ کریں۔
2. روبوٹ نیویگیشن کے لیے ایک مضبوط لرننگ الگورتھم ڈیزائن کریں۔
3. مختلف روبوٹ کے رویوں کی شناخت کے لیے کلسٹرنگ کی تکنیکوں کو لاگو کریں۔`
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
            <a href="/urdu-chapter-5">← Previous: Chapter 5</a>
            <a href="/urdu-chapter-7">Next: Chapter 7 →</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter6Page;