---
sidebar_label: 'ROS 2 Fundamentals'
title: 'Chapter 2 - ROS 2 Fundamentals and Node Architecture'
---

# Chapter 2 - ROS 2 Fundamentals and Node Architecture

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

```python
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
```

### Creating a Simple Subscriber Node

```python
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
```

## Advanced ROS 2 Concepts

### Services

Services provide synchronous request/response communication:

```python
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response
```

### Actions

Actions are used for long-running tasks with feedback:

```python
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
```

## Chapter Summary

This chapter covered the fundamentals of ROS 2, including its architecture, node communication patterns, and practical implementation examples. Understanding these concepts is crucial for developing complex robotic systems.

## Exercises

1. Create a ROS 2 package with a publisher and subscriber node.
2. Implement a service that performs a mathematical operation.
3. Design an action server that controls a robot's movement.
4. Research different DDS implementations supported by ROS 2.