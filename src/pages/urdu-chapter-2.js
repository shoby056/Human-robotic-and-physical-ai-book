import React from 'react';
import styles from '../components/UrduTranslation.module.css';

const UrduChapter2Page = () => {
  const chapter = {
    id: 2,
    title: 'Humanoid Robotics Fundamentals',
    urduTitle: 'ہیومنوائڈ روبوٹکس کے بنیادی اصول',
    content: `# Chapter 2 - ROS 2 Fundamentals and Node Architecture

## Overview

This chapter delves into the Robot Operating System 2 (ROS 2), focusing on its architecture, node communication, and practical implementation. ROS 2 is essential for developing complex robotic systems and forms the backbone of many Physical AI applications.

## Learning Objectives

By the end of this chapter, you will be able to:
- Understand the architecture of ROS 2
- Create and manage ROS 2 nodes
- Implement communication between nodes using topics, services, and actions
- Design distributed robotic systems using ROS 2 concepts

## ROS 2 Architecture

ROS 2 uses a distributed architecture based on the Data Distribution Service (DDS) for communication. This provides:
- **Nodes**: Processes that perform computation
- **Topics**: Streams of data that nodes publish and subscribe to
- **Services**: Synchronous request/response communication
- **Actions**: Asynchronous goal-oriented communication with feedback

### Nodes and Processes

A node is an executable that uses ROS 2 to communicate with other nodes. Nodes are lightweight processes that work together to form a complete robotic application. Each node runs within a process and can contain multiple threads.

### Topics and Message Passing

Topics enable asynchronous communication between nodes through a publish-subscribe pattern:
- Publishers send data to topics
- Subscribers receive data from topics
- Multiple publishers and subscribers can exist for the same topic

## Practical Implementation

### Creating a Simple Publisher Node

\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1
\`\`\`

### Creating a Simple Subscriber Node

\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)
\`\`\`

## Advanced ROS 2 Concepts

### Services

Services provide synchronous request/response communication:

\`\`\`python
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\\na: %d b: %d' % (request.a, request.b))
        return response
\`\`\`

### Actions

Actions are used for long-running tasks with feedback:

\`\`\`python
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node

from example_interfaces.action import Fibonacci

class FibonacciActionServer(Node):
    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            feedback_msg.sequence.append(
                feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            self.get_logger().info('Feedback: {feedback_msg.sequence}')
            goal_handle.publish_feedback(feedback_msg)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        return result
\`\`\`

## Chapter Summary

This chapter covered the fundamentals of ROS 2, including its architecture, node communication patterns, and practical implementation examples. Understanding these concepts is crucial for developing complex robotic systems.

## Exercises

1. Create a ROS 2 package with a publisher and subscriber node.
2. Implement a service that performs a mathematical operation.
3. Design an action server that controls a robot's movement.
4. Research different DDS implementations supported by ROS 2.`,
    urduContent: `# باب 2 - ROS 2 کے بنیادی اصول اور نوڈ آرکیٹیکچر

## جائزہ

یہ باب روبوٹ آپریٹنگ سسٹم 2 (ROS 2) میں گہرائی سے جاتا ہے، اس کے معمار، نوڈ کے مواصلات، اور عملی نفاذ پر توجہ مرکوز کرتا ہے۔ ROS 2 پیچیدہ روبوٹک سسٹمز تیار کرنے کے لیے ضروری ہے اور کئی فزکل ای آئی ایپلی کیشنز کا پیٹھ کا ستون ہے۔

## سیکھنے کے اہداف

اس باب کو ختم کرنے تک آپ کے استطاعت ہو گی:
- ROS 2 کے معمار کو سمجھنا
- ROS 2 نوڈز تیار کرنا اور ان کا نظم کرنا
- ٹاپکس، سروسز، اور ایکشنز کا استعمال کرتے ہوئے نوڈز کے درمیان مواصلات نافذ کرنا
- ROS 2 کے تصورات کا استعمال کرتے ہوئے تقسیم شدہ روبوٹک سسٹمز ڈیزائن کرنا

## ROS 2 معمار

ROS 2 مواصلات کے لیے ڈیٹا ڈسٹری بیوشن سروس (DDS) کی بنیاد پر ایک تقسیم شدہ معمار کا استعمال کرتا ہے۔ یہ درج ذیل فراہم کرتا ہے:
- **نوڈز**: عمل جو حساب کتاب انجام دیتے ہیں
- **ٹاپکس**: ڈیٹا کے سٹریمز جنہیں نوڈز شائع اور سبسکرائب کرتے ہیں
- **سروسز**: ہم وقت میں درخواست/جواب کی مواصلت
- **ایکشنز**: فیڈ بیک کے ساتھ ہدف پر مبنی غیر ہم وقت مواصلت

### نوڈز اور عمل

ایک نوڈ ایک ایسا قابل عمل ہے جو ROS 2 کا استعمال دوسرے نوڈز کے ساتھ مواصلات کرنے کے لیے کرتا ہے۔ نوڈز ہلکے عمل ہیں جو ایک مکمل روبوٹک ایپلی کیشن تشکیل دینے کے لیے ایک ساتھ کام کرتے ہیں۔ ہر نوڈ ایک عمل کے اندر چلتا ہے اور متعدد تھریڈز کو رکھ سکتا ہے۔

### ٹاپکس اور میسج کا تبادلہ

ٹاپکس نوڈز کے درمیان غیر ہم وقت مواصلات کو ایک شائع کنندہ-سبسکرائب کرنے والہ پیٹرن کے ذریعے فعال کرتے ہیں:
- شائع کنندہ ٹاپکس کو ڈیٹا بھیجتے ہیں
- سبسکرائب کرنے والے ٹاپکس سے ڈیٹا وصول کرتے ہیں
- ایک ہی ٹاپک کے لیے متعدد شائع کنندہ اور سبسکرائب کرنے والے موجود ہو سکتے ہیں

## عملی نفاذ

### ایک سادہ شائع کنندہ نوڈ تیار کرنا

\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1
\`\`\`

### ایک سادہ سبسکرائب کرنے والا نوڈ تیار کرنا

\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)
\`\`\`

## اعلیٰ ROS 2 تصورات

### سروسز

سروسز ہم وقت درخواست/جواب کی مواصلت فراہم کرتی ہیں:

\`\`\`python
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\\na: %d b: %d' % (request.a, request.b))
        return response
\`\`\`

### ایکشنز

ایکشنز فیڈ بیک کے ساتھ طویل وقت تک جاری رہنے والے کاموں کے لیے استعمال ہوتے ہیں:

\`\`\`python
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node

from example_interfaces.action import Fibonacci

class FibonacciActionServer(Node):
    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            feedback_msg.sequence.append(
                feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            self.get_logger().info('Feedback: {feedback_msg.sequence}')
            goal_handle.publish_feedback(feedback_msg)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        return result
\`\`\`

## باب کا خلاصہ

اس باب نے ROS 2 کے بنیادیات کو احاطہ کیا، بشمول اس کا معمار، نوڈ کے مواصلات کے پیٹرنز، اور عملی نفاذ کی مثالیں۔ ان تصورات کو سمجھنا پیچیدہ روبوٹک سسٹمز تیار کرنے کے لیے انتہائی ضروری ہے۔

## مشقیں

1. ایک شائع کنندہ اور سبسکرائب کرنے والے نوڈ کے ساتھ ایک ROS 2 پیکج تیار کریں۔
2. ایک سروس نافذ کریں جو ریاضی کا عمل انجام دیتی ہے۔
3. ایک ایکشن سرور ڈیزائن کریں جو روبوٹ کی حرکت کو کنٹرول کرتا ہے۔
4. مختلف DDS نفاذ کی تحقیق کریں جنہیں ROS 2 سپورٹ کرتا ہے۔`
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
            <a href="/urdu-chapter-1">← Previous: Chapter 1</a>
            <a href="/urdu-chapter-3">Next: Chapter 3 →</a>
            <a href="/urdu">Back to Urdu Index</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduChapter2Page;