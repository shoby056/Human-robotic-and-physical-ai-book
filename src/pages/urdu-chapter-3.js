import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter3Page = () => {
  const chapter = {
    id: 3,
    title: 'Sensor Integration and Perception',
    urduTitle: 'سینسر انٹیگریشن اور تاثر',
    content: `# Chapter 3 - Kinematics and Motion Planning

## Overview

This chapter explores kinematics and motion planning in robotic systems. Kinematics deals with the motion of mechanical systems without considering the forces that cause the motion, while motion planning focuses on determining a path for a robot to follow to reach its goal while avoiding obstacles.

## Learning Objectives

By the end of this chapter, you will be able to:
- Understand forward and inverse kinematics
- Apply motion planning algorithms
- Implement trajectory generation techniques
- Design collision avoidance strategies

## Forward Kinematics

Forward kinematics is the process of calculating the position and orientation of the end effector given the joint angles. This is typically straightforward and involves applying transformation matrices for each joint in the chain.

For a simple 2-link planar manipulator with joint angles θ1 and θ2:
- x = l1 * cos(θ1) + l2 * cos(θ1 + θ2)
- y = l1 * sin(θ1) + l2 * sin(θ1 + θ2)

Where l1 and l2 are the lengths of the two links.

## Inverse Kinematics

Inverse kinematics is the reverse process - determining the joint angles required to achieve a desired end effector position and orientation. This is more complex and may have multiple solutions or no solution at all.

For a 2-link planar manipulator:
- r = sqrt(x² + y²)
- θ2 = arccos((l1² + l2² - r²) / (2 * l1 * l2))
- θ1 = arctan(y/x) - arctan((l2 * sin(θ2)) / (l1 + l2 * cos(θ2)))

## Motion Planning Algorithms

### A* Algorithm

A* is a popular pathfinding algorithm that uses a heuristic to guide its search. It maintains a priority queue of nodes to explore, prioritizing nodes that appear to lead to the goal.

### Rapidly-exploring Random Trees (RRT)

RRT is particularly useful for high-dimensional spaces and complex environments. It randomly samples the configuration space and grows a tree from the start position toward the samples.

## Trajectory Generation

Trajectory generation involves creating smooth paths with specified velocities and accelerations. Common approaches include:

- Polynomial interpolation
- Spline curves
- B-splines and Bezier curves

## Chapter Summary

This chapter covered the fundamentals of kinematics and motion planning, essential for controlling robotic systems and enabling them to navigate complex environments effectively.

## Exercises

1. Implement forward kinematics for a 3-DOF planar manipulator.
2. Calculate the inverse kinematics solution for a simple 2-DOF manipulator.
3. Compare the performance of A* and RRT algorithms for different scenarios.`,
    urduContent: `# باب 3 - کنیمیٹکس اور موشن پلاننگ

## جائزہ

یہ باب روبوٹک سسٹمز میں کنیمیٹکس اور موشن پلاننگ کا جائزہ لیتا ہے۔ کنیمیٹکس حرکت کے میکانی نظام کے بارے میں بات کرتا ہے بغیر اس بات کو سمجھے کہ حرکت کی وجہ کیا ہے، جبکہ موشن پلاننگ کسی روبوٹ کے لیے ایک راستہ متعین کرنے پر توجہ مرکوز کرتا ہے تاکہ وہ اپنے ہدف تک پہنچ سکے جبکہ رکاوٹوں سے بچ سکے۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- فارورڈ اور انورس کنیمیٹکس کو سمجھنا
- موشن پلاننگ الگورتھم کو نافذ کرنا
- ٹریجکٹری جنریشن کی تکنیکوں کو نافذ کرنا
- کولیژن ایوائڈینس کی حکمت عمل کاریاں ڈیزائن کرنا

## فارورڈ کنیمیٹکس

فارورڈ کنیمیٹکس ایک ایسا عمل ہے جس میں مشترکہ اینگلز کے تحت اینڈ ایفیکٹر کی پوزیشن اور اورینٹیشن کا حساب لگایا جاتا ہے۔ یہ عام طور پر آسان ہوتا ہے اور زنجیر میں ہر مشترکہ کے لیے ٹرانسفارمیشن میٹرکس کا اطلاق شامل ہوتا ہے۔

ایک سادہ 2-لنک پلانر مینیپولیٹر کے لیے جس میں مشترکہ اینگلز θ1 اور θ2 ہیں:
- x = l1 * cos(θ1) + l2 * cos(θ1 + θ2)
- y = l1 * sin(θ1) + l2 * sin(θ1 + θ2)

جہاں l1 اور l2 دو لنکس کی لمبائی ہے۔

## انورس کنیمیٹکس

انورس کنیمیٹکس الٹا عمل ہے - ایک مطلوبہ اینڈ ایفیکٹر پوزیشن اور اورینٹیشن کو حاصل کرنے کے لیے ضروری مشترکہ اینگلز کا تعین کرنا۔ یہ زیادہ پیچیدہ ہے اور اس میں متعدد حل یا کوئی حل نہیں ہو سکتا۔

ایک 2-لنک پلانر مینیپولیٹر کے لیے:
- r = sqrt(x² + y²)
- θ2 = arccos((l1² + l2² - r²) / (2 * l1 * l2))
- θ1 = arctan(y/x) - arctan((l2 * sin(θ2)) / (l1 + l2 * cos(θ2)))

## موشن پلاننگ الگورتھم

### A* الگورتھم

A* ایک مقبول راستہ تلاش الگورتھم ہے جو اپنی تلاش کی رہنمائی کے لیے ایک ہیورسٹک کا استعمال کرتا ہے۔ یہ نوڈس کی ایک ترجیحی قطار کو برقرار رکھتا ہے جنہیں تلاش کرنا ہے، ایسے نوڈس کو ترجیح دیتا ہے جو ہدف تک لے جانے کا امکان رکھتے ہیں۔

### ریپڈلی ایکسپلورنگ رینڈم ٹریز (RRT)

RRT خاص طور پر زیادہ طاقت والی جگہوں اور پیچیدہ ماحول کے لیے مفید ہے۔ یہ کنفیگریشن کی جگہ کو بے ترتیب نمونہ دیتا ہے اور شروع کی پوزیشن سے نمونوں کی طرف ایک درخت کو بڑھاتا ہے۔

## ٹریجکٹری جنریشن

ٹریجکٹری جنریشن میں مخصوص ویلیوسٹیز اور ایکسیلریشنز کے ساتھ ہموار راستے تیار کرنا شامل ہے۔ عام ا approaches میں شامل ہیں:

- پولینومیل انٹرپولیشن
- سپلائن کریس
- B-اسپلائن اور بیزیئر کریس

## باب کا خلاصہ

اس باب نے کنیمیٹکس اور موشن پلاننگ کے بنیادیات کو احاطہ کیا، جو روبوٹک سسٹمز کو کنٹرول کرنے اور انہیں پیچیدہ ماحول میں مؤثر طریقے سے نیویگیٹ کرنے کے قابل بنانے کے لیے ضروری ہے۔

## مشقیں

1. ایک 3-DOF پلانر مینیپولیٹر کے لیے فارورڈ کنیمیٹکس نافذ کریں۔
2. ایک سادہ 2-DOF مینیپولیٹر کے لیے انورس کنیمیٹکس حل کا حساب لگائیں۔
3. مختلف منظر ناموں کے لیے A* اور RRT الگورتھم کی کارکردگی کا موازنہ کریں۔`
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
            <a href="/urdu-chapter-2">← Previous: Chapter 2</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter3Page;