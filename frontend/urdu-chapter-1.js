import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter1Page = () => {
  const chapter = {
    id: 1,
    title: 'Introduction to Physical AI',
    urduTitle: 'فزکل ای آئی کا تعارف',
    content: `# Chapter 1 - Introduction to Physical AI and Humanoid Robotics

## Overview

This chapter introduces the fundamental concepts of Physical AI and Humanoid Robotics. Physical AI represents the intersection of artificial intelligence and physical systems, enabling robots to interact with the real world through perception, reasoning, and action.

## Learning Objectives

By the end of this chapter, you will be able to:
- Define Physical AI and its applications in robotics
- Understand the key components of humanoid robotics
- Identify the challenges and opportunities in the field
- Recognize the relationship between AI and physical systems

## What is Physical AI?

Physical AI refers to the branch of artificial intelligence that focuses on enabling machines to interact with the physical world. Unlike traditional AI that operates primarily in digital spaces, Physical AI systems must navigate the complexities of real-world physics, uncertainty, and dynamic environments.

Key characteristics of Physical AI include:
- **Perception**: Understanding the environment through sensors
- **Reasoning**: Making decisions based on environmental data
- **Action**: Executing physical movements and manipulations
- **Learning**: Adapting behavior based on experience

## Humanoid Robotics

Humanoid robots are designed to resemble and mimic human behavior. They typically feature:
- Bipedal locomotion
- Human-like body structure
- Advanced sensory systems
- Natural interaction capabilities

## The ROS 2 Ecosystem

Robot Operating System 2 (ROS 2) provides the framework for developing robot applications. It offers:
- Communication between robot components
- Hardware abstraction
- Device drivers
- Libraries for common robot functions

## Chapter Summary

This chapter provided an overview of Physical AI and Humanoid Robotics, establishing the foundation for more detailed exploration in subsequent chapters.

## Exercises

1. Research and list three real-world applications of Physical AI.
2. Explain the difference between Physical AI and traditional AI.
3. Describe the advantages and challenges of humanoid robot designs.`,
    urduContent: `# باب 1 - فزکل ای آئی اور ہیومنوائڈ روبوٹکس کا تعارف

## جائزہ

یہ باب فزکل ای آئی اور ہیومنوائڈ روبوٹکس کے بنیادی تصورات کا تعارف کراتا ہے۔ فزکل ای آئی مصنوعی ذہانت اور جسمانی نظام کا ایک ایسا نقطہ ہے جہاں روبوٹس حقیقی دنیا کے ساتھ ادراک، منطق اور عمل کے ذریعے تعامل کرنے کے قابل ہوتے ہیں۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- فزکل ای آئی کی وضاحت کرنا اور روبوٹکس میں اس کے اطلاقات کو سمجھنا
- ہیومنوائڈ روبوٹکس کے اہم جزو کو سمجھنا
- شعبے میں چیلنجز اور مواقع کی شناخت کرنا
- ای آئی اور جسمانی نظام کے درمیان تعلق کو پہچاننا

## فزکل ای آئی کیا ہے؟

فزکل ای آئی مصنوعی ذہانت کی وہ شاخ ہے جو مشینوں کو جسمانی دنیا کے ساتھ تعامل کرنے کے قابل بنانے پر توجہ مرکوز کرتی ہے۔ روایتی ای آئی کے برعکس جو بنیادی طور پر ڈیجیٹل خلا میں کام کرتی ہے، فزکل ای آئی سسٹمز کو حقیقی دنیا کی طاقت، عدم یقینی اور متحرک ماحول کی پیچیدگیوں سے نبرد آزما ہونا چاہیے۔

فزکل ای آئی کی اہم خصوصیات میں شامل ہیں:
- **ادراک**: سینسرز کے ذریعے ماحول کو سمجھنا
- **منطق**: ماحولیاتی ڈیٹا کی بنیاد پر فیصلے کرنا
- **عمل**: جسمانی حرکات اور مینوپولیشن انجام دینا
- **سیکھنا**: تجربے کی بنیاد پر رویے کو اڈجسٹ کرنا

## ہیومنوائڈ روبوٹکس

ہیومنوائڈ روبوٹس کو انسانی رویوں کی نقل کرنے اور انسانی رویوں کی تقلید کے لیے ڈیزائن کیا گیا ہے۔ وہ عام طور پر درج ذیل خصوصیات رکھتے ہیں:
- بائی پیڈل لوکوموشن
- انسان کی طرح جسم کی ساخت
- جدید حسی نظام
- قدرتی تعامل کی صلاحیتیں

## ROS 2 ایکو سسٹم

روبوٹ آپریٹنگ سسٹم 2 (ROS 2) روبوٹ ایپلی کیشنز تیار کرنے کا ڈھانچہ فراہم کرتا ہے۔ یہ درج ذیل فراہم کرتا ہے:
- روبوٹ کمپونینٹس کے درمیان مواصلت
- ہارڈ ویئر ابھاسٹریکشن
- ڈیوائس ڈرائیورز
- روبوٹ کے عام فنکشنز کے لیے لائبریریز

## باب کا خلاصہ

اس باب نے فزکل ای آئی اور ہیومنوائڈ روبوٹکس کا جائزہ فراہم کیا، اگلے ابواب میں مزید تفصیلی تلاش کے لیے بنیاد قائم کی۔

## مشقیں

1. فزکل ای آئی کے تین حقیقی دنیا کے اطلاقات تلاش کریں اور فہرست بند کریں۔
2. فزکل ای آئی اور روایتی ای آئی کے درمیان فرق کی وضاحت کریں۔
3. ہیومنوائڈ روبوٹ ڈیزائنز کے فوائد اور چیلنجز کی وضاحت کریں۔`
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
            <a href="/urdu">← Back to Urdu Translation Index</a>
            <a href="/urdu-chapter-2">Next: Chapter 2 →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter1Page;