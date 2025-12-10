import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './modules.module.css';

// Define the modules data
const modulesData = [
  {
    id: 'module1',
    title: 'Module 1: ROS 2 Fundamentals',
    description: 'Learn the fundamentals of Robot Operating System 2, including nodes, topics, services, and actions for building robust robotic applications.',
    path: '/docs/modules/module1-ros2-fundamentals'
  },
  {
    id: 'module2',
    title: 'Module 2: Digital Twin (Gazebo & Unity)',
    description: 'Explore digital twin technologies using Gazebo physics simulation and Unity 3D for creating virtual replicas of robotic systems.',
    path: '/docs/modules/module2-digital-twin'
  },
  {
    id: 'module3',
    title: 'Module 3: NVIDIA Isaac AI & Perception',
    description: 'Master NVIDIA Isaac SDK for AI-powered robotics, including perception algorithms and GPU-accelerated computing.',
    path: '/docs/modules/module3-nvidia-isaac'
  },
  {
    id: 'module4',
    title: 'Module 4: Vision-Language-Action (VLA)',
    description: 'Understand Vision-Language-Action models for multimodal robotics applications and human-robot interaction.',
    path: '/docs/modules/module4-vla'
  },
  {
    id: 'capstone',
    title: 'Capstone Project: Autonomous Humanoid Robot',
    description: 'Integrate all concepts in a comprehensive project building an autonomous humanoid robot system.',
    path: '/docs/modules/capstone-project'
  }
];

function ModuleCard({ module }) {
  return (
    <div className={clsx('col col--4', styles.moduleCard)}>
      <div className={styles.cardInner}>
        <h3 className={styles.moduleTitle}>{module.title}</h3>
        <p className={styles.moduleDescription}>{module.description}</p>
        <Link to={module.path} className={styles.moduleButton}>
          Explore Module →
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="A complete guide to understanding Physical AI, Robotics, and Humanoid Systems"
    >
      <div
        style={{
          padding: '50px 20px',
          textAlign: 'center',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            lineHeight: 1.2,
            background: 'linear-gradient(90deg, #c752c3, #6a11cb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Physical AI & Humanoid Robotics
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            marginTop: '15px',
            lineHeight: 1.6,
            color: '#555',
          }}
        >
          Your complete textbook for understanding the future of AI + Robotics.
        </p>

        {/* Header Image */}
        <img
          src="/img/robotic.jpg"
          alt="Humanoid Robot"
          style={{
            width: 'clamp(300px, 70%, 700px)',
            marginTop: '35px',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Start Button */}
        <div style={{ marginTop: '40px' }}>
          <Link
            to="/docs/chapter-select"
            style={{
              display: 'inline-block',
              padding: '16px 30px',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              background: 'linear-gradient(90deg, #c752c3, #6a11cb)',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
          >
            📘 Start Reading the Book
          </Link>
        </div>

        {/* Modules Section */}
        <div style={{ marginTop: '60px', paddingTop: '50px', borderTop: '1px solid #eee' }}>
          <h2
            style={{
              fontSize: '2.2rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: '#2c3e50',
            }}
          >
            Course Modules
          </h2>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.1rem',
              color: '#7f8c8d',
              marginBottom: '3rem',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6',
            }}
          >
            Explore all modules of the Physical AI & Humanoid Robotics textbook.
            Each module covers essential topics for mastering robotics and AI concepts.
          </p>

          <div className="row">
            {modulesData.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
