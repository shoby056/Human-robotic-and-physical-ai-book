import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter10Page = () => {
  const chapter = {
    id: 10,
    title: 'Capstone: Building an Integrated Physical AI System',
    urduTitle: 'کیپسٹون: ایک مکمل فزکل ای آئی سسٹم تیار کرنا',
    content: `# Chapter 10 - Capstone: Building an Integrated Physical AI System

## Overview

This capstone chapter integrates all concepts learned throughout the textbook to design and implement a complete Physical AI system. Students will apply knowledge from previous chapters to create a functional robotic system that demonstrates the integration of multiple AI and robotics technologies.

## Learning Objectives

By the end of this chapter, you will be able to:
- Design a complete Physical AI system architecture
- Integrate multiple technologies and components
- Implement safety and ethical considerations
- Evaluate system performance and effectiveness

## System Design Process

### Requirements Analysis

The first step in building a Physical AI system is understanding the requirements:
- Functional requirements: What the system should do
- Non-functional requirements: Performance, safety, and reliability constraints
- Environmental requirements: Operating conditions and constraints

### Architecture Design

Creating a system architecture that integrates:
- Perception systems (sensors and computer vision)
- Planning and control systems
- Learning and adaptation modules
- Human-robot interaction interfaces

### Component Selection

Choosing appropriate hardware and software components based on:
- System requirements
- Cost constraints
- Performance specifications
- Compatibility considerations

## Implementation Approach

### Modular Development

Building the system in modular components:
- Perception module
- Planning and navigation module
- Control module
- Learning module
- Interface module

### Integration Strategy

Integrating modules while maintaining:
- System stability
- Performance efficiency
- Error handling capabilities
- Scalability for future enhancements

## Safety and Ethics Implementation

### Safety Measures

Implementing safety at multiple levels:
- Hardware safety (limit switches, emergency stops)
- Software safety (bounds checking, validation)
- Operational safety (collision avoidance, safe trajectories)

### Ethical Considerations

Embedding ethical principles into the system:
- Privacy protection
- Bias mitigation
- Transparency and explainability
- Human oversight mechanisms

## Testing and Validation

### Unit Testing

Testing individual modules:
- Sensor accuracy validation
- Algorithm performance verification
- Safety system response testing

### Integration Testing

Testing module interactions:
- Data flow verification
- Timing and synchronization
- Error propagation analysis

### System Testing

Testing the complete system:
- Functional requirement validation
- Performance benchmarking
- Safety and reliability assessment

## Case Study: Mobile Manipulator System

This section presents a detailed case study of a mobile manipulator system that combines:
- Autonomous navigation
- Object recognition and manipulation
- Human-robot interaction
- Learning capabilities

### System Specifications
- Mobile base with differential drive
- 6-DOF robotic arm
- RGB-D camera for perception
- Force/torque sensors for manipulation

### Implementation Details

#### Navigation System
The navigation system combines:
- LIDAR for environment mapping
- Computer vision for dynamic obstacle detection
- Path planning algorithms for route optimization

#### Manipulation System
The manipulation system includes:
- Vision-based object recognition
- Inverse kinematics for arm control
- Force control for safe interaction

#### Learning System
The learning system implements:
- Reinforcement learning for task optimization
- Supervised learning for object classification
- Adaptive control for environmental changes

## Performance Evaluation

### Metrics for Success

Evaluating the system using:
- Task completion rate
- Accuracy and precision metrics
- Efficiency measures (time, energy)
- Safety and reliability metrics

### Comparative Analysis

Comparing performance with:
- Baseline systems
- Alternative approaches
- Theoretical limits

## Future Enhancements

### Potential Improvements

Areas for future development:
- Advanced learning algorithms
- Multi-modal perception
- Improved human-robot interaction
- Enhanced autonomy levels

### Research Directions

Emerging research areas:
- Neuromorphic AI integration
- Quantum-enhanced algorithms
- Collaborative robot teams
- Swarm robotics applications

## Chapter Summary

This capstone chapter demonstrated the integration of all Physical AI concepts into a complete working system. Students have learned to combine perception, planning, control, and learning to create sophisticated robotic systems.

## Exercises

1. Design your own Physical AI system for a specific application.
2. Implement one module of the system and test its functionality.
3. Conduct a comprehensive safety and ethics review of your design.`,
    urduContent: `# باب 10 - کیپسٹون: ایک مکمل فزکل ای آئی سسٹم تیار کرنا

## جائزہ

یہ کیپسٹون باب مکمل کتاب میں سیکھے گئے تمام تصورات کو یکجا کرتا ہے تاکہ ایک مکمل فزکل ای آئی سسٹم ڈیزائن اور نافذ کیا جا سکے۔ طلباء پچھلے ابواب سے حاصل کردہ علم کو ایک عملی روبوٹک سسٹم تیار کرنے کے لیے لاگو کریں گے جو متعدد ای آئی اور روبوٹکس ٹیکنالوجیوں کے انضمام کا مظاہرہ کرتا ہے۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- ایک مکمل فزکل ای آئی سسٹم آرکیٹیکچر ڈیزائن کرنا
- متعدد ٹیکنالوجیوں اور جزووں کو یکجا کرنا
- حفاظت اور اخلاقیات کے مسائل نافذ کرنا
- سسٹم کی کارکردگی اور مؤثرتا کا جائزہ لینا

## سسٹم ڈیزائن کا عمل

### تقاضوں کا تجزیہ

ایک فزکل ای آئی سسٹم تیار کرنے کا پہلا قدم تقاضوں کو سمجھنا ہے:
- عملی تقاضے: سسٹم کیا کرنا چاہیے
- غیر عملی تقاضے: کارکردگی، حفاظت، اور قابل اعتمادی کی پابندیاں
- ماحولیاتی تقاضے: کام کرنے کی شرائط اور پابندیاں

### آرکیٹیکچر ڈیزائن

ایک سسٹم آرکیٹیکچر تیار کرنا جو یکجا کرتا ہے:
- تاثر کے نظام (سینسرز اور کمپیوٹر وژن)
- منصوبہ بندی اور کنٹرول سسٹم
- سیکھنے اور مطابقت کے ماڈیولز
- ہیومن-روبوٹ انٹرایکشن انٹرفیسز

### جزو کا انتخاب

مناسب ہارڈ ویئر اور سافٹ ویئر جزوؤں کا انتخاب:
- سسٹم کے تقاضوں کے مطابق
- لاگت کی پابندیوں کے مطابق
- کارکردگی کی خصوصیات کے مطابق
- مطابقت کے غور و فکر کے مطابق

## نفاذ کا طریقہ

### ماڈیولر ترقی

سسٹم کو ماڈیولر جزوؤں میں تیار کرنا:
- تاثر ماڈیول
- منصوبہ بندی اور نیویگیشن ماڈیول
- کنٹرول ماڈیول
- سیکھنے کا ماڈیول
- انٹرفیس ماڈیول

### انضمام کی حکمت عمل

ماڈیولز کو یکجا کرنا جبکہ یقین دہانی کرائی جائے:
- سسٹم کی استحکام
- کارکردگی کی مؤثرتا
- غلطی کے انتظام کی صلاحیتیں
- مستقبل کی ترقی کے لیے قابل توسیع

## حفاظت اور اخلاق کا نفاذ

### حفاظتی اقدامات

حفاظت کو متعدد سطحوں پر نافذ کرنا:
- ہارڈ ویئر حفاظت (حد کے سوئچز، ہنگامی بندش)
- سافٹ ویئر حفاظت (حدود کی چیکنگ، توثیق)
- عملی حفاظت (کولیژن سے بچاؤ، محفوظ ٹریجکٹریز)

### اخلاقی مسائل

سسٹم میں اخلاقی اصولوں کو بنا دیں:
- رازداری کی حفاظت
- تعصب کی کمی
- شفافیت اور تشریح کرنا
- انسانی نگرانی کے میکانزم

## ٹیسٹنگ اور توثیق

### یونٹ ٹیسٹنگ

انفرادی ماڈیولز کی ٹیسٹنگ:
- سینسر درستگی کی توثیق
- الگورتھم کارکردگی کی تصدیق
- حفاظتی سسٹم ردعمل کی ٹیسٹنگ

### انضمام ٹیسٹنگ

ماڈیولز کے تعاملات کی ٹیسٹنگ:
- ڈیٹا کے بہاؤ کی توثیق
- وقت اور ہم آہنگی
- غلطی کے پھیلاؤ کا تجزیہ

### سسٹم ٹیسٹنگ

مکمل سسٹم کی ٹیسٹنگ:
- عملی تقاضوں کی توثیق
- کارکردگی کی ٹیکنالوجی
- حفاظت اور قابل اعتمادی کا جائزہ

## کیس اسٹڈی: موبل مینوپولیٹر سسٹم

یہ سیکشن ایک تفصیلی کیس اسٹڈی پیش کرتا ہے ایک موبل مینوپولیٹر سسٹم کی جو یکجا کرتا ہے:
- خودکار نیویگیشن
- آبجیکٹ کی پہچان اور مینوپولیشن
- ہیومن-روبوٹ انٹرایکشن
- سیکھنے کی صلاحیتیں

### سسٹم کی خصوصیات
- ڈیفرینشل ڈرائیو کے ساتھ موبل بیس
- 6-DOF روبوٹک آرم
- تاثر کے لیے RGB-D کیمرا
- مینوپولیشن کے لیے قوت/ٹورک سینسرز

### نفاذ کی تفصیلات

#### نیویگیشن سسٹم
نیویگیشن سسٹم یکجا کرتا ہے:
- ماحول کی میپنگ کے لیے LIDAR
- متحرک رکاوٹ کے پتہ لگانے کے لیے کمپیوٹر وژن
- راستے کے انتظام کے لیے پاتھ پلاننگ الگورتھم

#### مینوپولیشن سسٹم
مینوپولیشن سسٹم میں شامل ہے:
- ویژن-بیسڈ آبجیکٹ کی پہچان
- آرم کنٹرول کے لیے انورس کنیمیٹکس
- محفوظ تعامل کے لیے قوت کنٹرول

#### سیکھنے کا سسٹم
سیکھنے کا سسٹم نافذ کرتا ہے:
- کام کی بہتری کے لیے مضبوط لرننگ
- آبجیکٹ کی درجہ بندی کے لیے نگرانی شدہ لرننگ
- ماحولیاتی تبدیلیوں کے لیے اڈاپٹیو کنٹرول

## کارکردگی کا جائزہ

### کامیابی کے میٹرکس

سسٹم کا جائزہ لینا:
- کام کی تکمیل کی شرح
- درستگی اور صحت کے میٹرکس
- مؤثرتا کے اقدار (وقت، توانائی)
- حفاظت اور قابل اعتمادی کے میٹرکس

### موازنہ کا تجزیہ

کارکردگی کا موازنہ:
- بیس لائن سسٹم کے ساتھ
- متبادل نقطہ نظر کے ساتھ
- نظریاتی حدود کے ساتھ

## مستقبل کی ترقیات

### ممکنہ بہتریاں

مستقبل کی ترقی کے لیے علاقوں:
- اعلیٰ سیکھنے والے الگورتھم
- ملٹی-موڈل تاثر
- بہتر ہیومن-روبوٹ انٹرایکشن
- بہتر خودمختاری کی سطحیں

### تحقیق کی سمتیں

نئے تحقیق کے علاقوں:
- نیورومورفک ای آئی انضمام
- کووینٹم-اندھر الگورتھم
- تعاونی روبوٹ ٹیمیں
- سوارم روبوٹکس کے اطلاقات

## باب کا خلاصہ

یہ کیپسٹون باب فزکل ای آئی کے تمام تصورات کو ایک مکمل کام کرنے والے سسٹم میں ضم کرنے کا مظاہرہ کرتا ہے۔ طلباء نے تاثر، منصوبہ بندی، کنٹرول، اور سیکھنے کو جمع کر کے ترقی یافتہ روبوٹک سسٹم تیار کرنا سیکھا ہے۔

## مشقیں

1. ایک مخصوص اطلاق کے لیے اپنا فزکل ای آئی سسٹم ڈیزائن کریں۔
2. سسٹم کا ایک ماڈیول نافذ کریں اور اس کی کارکردگی کی ٹیسٹ کریں۔
3. اپنے ڈیزائن کا جامع حفاظت اور اخلاق کا جائزہ لیں۔`
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
            <a href="/urdu-chapter-9">← Previous: Chapter 9</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter10Page;