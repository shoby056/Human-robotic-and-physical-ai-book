import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter4Page = () => {
  const chapter = {
    id: 4,
    title: 'Dynamics and Control Systems',
    urduTitle: 'ڈائنیمکس اور کنٹرول سسٹمز',
    content: `# Chapter 4 - Dynamics and Control Systems

## Overview

This chapter explores the dynamics of robotic systems and control theory. While kinematics deals with motion without considering forces, dynamics focuses on how forces and torques affect the motion of robotic systems. Control systems ensure that robots behave as intended despite disturbances and uncertainties.

## Learning Objectives

By the end of this chapter, you will be able to:
- Understand the principles of robotic dynamics
- Apply control theory to robotic systems
- Design feedback control systems
- Implement PID controllers for robot control

## Robotic Dynamics

Robotic dynamics involves the relationship between forces acting on a robot and the resulting motion. The fundamental equation is Newton-Euler's equation:

F = ma (for translational motion)
τ = Iα (for rotational motion)

Where F is force, m is mass, a is acceleration, τ is torque, I is moment of inertia, and α is angular acceleration.

### Lagrangian Formulation

The Lagrangian method provides a systematic way to derive equations of motion for complex robotic systems:

L = T - V

Where L is the Lagrangian, T is kinetic energy, and V is potential energy.

## Control Systems in Robotics

### Open-Loop vs Closed-Loop Control

Open-loop control systems do not use feedback, while closed-loop systems continuously monitor the output and adjust the input accordingly.

### PID Control

Proportional-Integral-Derivative (PID) controllers are widely used in robotics:

u(t) = Kp * e(t) + Ki * ∫e(t)dt + Kd * de(t)/dt

Where u(t) is the control signal, e(t) is the error, and Kp, Ki, Kd are the proportional, integral, and derivative gains respectively.

## Advanced Control Techniques

### Adaptive Control

Adaptive control systems adjust their parameters in real-time to accommodate changes in system dynamics or operating conditions.

### Robust Control

Robust control techniques ensure system stability and performance despite model uncertainties and external disturbances.

## Chapter Summary

This chapter covered the dynamics of robotic systems and essential control techniques. Understanding these concepts is crucial for developing robots that can operate reliably in real-world environments.

## Exercises

1. Derive the dynamic equations for a simple 2-DOF manipulator.
2. Implement a PID controller for a mobile robot's position control.
3. Design an adaptive control system for a robotic arm.`,
    urduContent: `# باب 4 - ڈائنیمکس اور کنٹرول سسٹمز

## جائزہ

یہ باب روبوٹک سسٹمز کی ڈائنیمکس اور کنٹرول تھیوری کا جائزہ لیتا ہے۔ جبکہ کنیمیٹکس بروقت قوتوں کو سمجھے بغیر حرکت کے بارے میں بات کرتا ہے، ڈائنیمکس اس بات پر توجہ مرکوز کرتا ہے کہ قوتیں اور ٹورکس روبوٹک سسٹمز کی حرکت کو کیسے متاثر کرتے ہیں۔ کنٹرول سسٹمز یقینی بناتے ہیں کہ روبوٹس متوقعہ طور پر کام کریں بطور مداخلت اور عدم یقینی کے باوجود۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- روبوٹک ڈائنیمکس کے اصولوں کو سمجھنا
- روبوٹک سسٹمز پر کنٹرول تھیوری کو لاگو کرنا
- فیڈ بیک کنٹرول سسٹمز ڈیزائن کرنا
- روبوٹ کنٹرول کے لیے PID کنٹرولرز نافذ کرنا

## روبوٹک ڈائنیمکس

روبوٹک ڈائنیمکس میں ایک روبوٹ پر کام کرنے والی قوتوں اور حاصل کردہ حرکت کے درمیان تعلق شامل ہے۔ بنیادی مساوات نیوٹن-ایولر کی مساوات ہے:

F = ma (لکیری حرکت کے لیے)
τ = Iα (گردشی حرکت کے لیے)

جہاں F قوت ہے، m ماس ہے، a تیزی ہے، τ ٹورک ہے، I لمحہ انیشیا ہے، اور α زاویہ وار تیزی ہے۔

### لاگرانجین فارمولیشن

لاگرانجین طریقہ حرکت کے مساوات کو حل کرنے کا ایک نظامی طریقہ فراہم کرتا ہے:

L = T - V

جہاں L لاگرانجین ہے، T کائینیٹک توانائی ہے، اور V ممکنہ توانائی ہے۔

## روبوٹکس میں کنٹرول سسٹمز

### کھلے طور پر کنٹرول بمقابلہ بند کنٹرول

کھلے طور پر کنٹرول سسٹمز فیڈ بیک کا استعمال نہیں کرتے، جبکہ بند سسٹمز مسلسل آؤٹ پٹ کو مانیٹر کرتے ہیں اور ان پٹ کو مناسب طریقے سے ایڈجسٹ کرتے ہیں۔

### PID کنٹرول

پروپورشل-انٹیگرل-ڈیریویٹو (PID) کنٹرولرز روبوٹکس میں زیادہ استعمال ہوتے ہیں:

u(t) = Kp * e(t) + Ki * ∫e(t)dt + Kd * de(t)/dt

جہاں u(t) کنٹرول سگنل ہے، e(t) غلطی ہے، اور Kp، Ki، Kd بالترتیب پروپورشل، انٹیگرل، اور ڈیریویٹو گین ہیں۔

## اعلیٰ کنٹرول کی تکنیکیں

### اڈاپٹیو کنٹرول

اڈاپٹیو کنٹرول سسٹمز اصل وقت میں اپنے پیرامیٹرز کو ایڈجسٹ کرتے ہیں تاکہ سسٹم ڈائنیمکس یا کام کی حالت میں تبدیلیوں کو ایڈجسٹ کیا جا سکے۔

### روبسٹ کنٹرول

روبسٹ کنٹرول کی تکنیکیں سسٹم کی مستحکم اور کارکردگی کو یقینی بناتی ہیں چاہے ماڈل کی عدم یقینی اور بیرونی مداخلت کے باوجود۔

## باب کا خلاصہ

اس باب نے روبوٹک سسٹمز کی ڈائنیمکس اور ضروری کنٹرول کی تکنیکوں کو احاطہ کیا۔ ان تصورات کو سمجھنا حقیقی دنیا کے ماحول میں قابل اعتماد طور پر کام کرنے والے روبوٹس تیار کرنے کے لیے ضروری ہے۔

## مشقیں

1. ایک سادہ 2-DOF مینیپولیٹر کے لیے ڈائنیمک مساوات حاصل کریں۔
2. ایک موبائل روبوٹ کے پوزیشن کنٹرول کے لیے ایک PID کنٹرولر نافذ کریں۔
3. ایک روبوٹک آرم کے لیے ایک اڈاپٹیو کنٹرول سسٹم ڈیزائن کریں۔`
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
            <a href="/urdu-chapter-3">← Previous: Chapter 3</a>
            <a href="/urdu-chapter-5">Next: Chapter 5 →</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter4Page;