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
          padding: '0 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        {/* Hero Section with Premium Background */}
        <section className="premium-hero" style={{
          textAlign: 'center',
          padding: '100px 20px 80px',
          marginBottom: '70px',
          background: 'var(--ifm-hero-background-color)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background pattern for light theme */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 10% 20%, rgba(93, 95, 239, 0.05) 0%, transparent 20%)',
            borderRadius: '20px',
            zIndex: 0
          }}></div>

          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--ifm-color-primary), var(--ifm-color-primary-light), var(--ifm-color-primary))',
            borderRadius: '2px',
            opacity: '0.6',
            zIndex: 1
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                background: 'linear-gradient(124deg, var(--ifm-color-primary), var(--ifm-color-primary-light), var(--ifm-color-primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '25px',
                letterSpacing: '-0.03em',
                position: 'relative'
              }}
            >
              Physical AI & Humanoid Robotics
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                lineHeight: '1.7',
                color: 'var(--ifm-color-gray-600)',
                maxWidth: '750px',
                margin: '0 auto 40px',
                letterSpacing: '0.01em'
              }}
            >
              Your complete textbook for understanding the future of AI + Robotics.
              Master the cutting-edge technologies powering the next generation of intelligent machines.
            </p>

            <div style={{ marginTop: '35px' }}>
              <Link
                to="/docs/chapter-select"
                style={{
                  display: 'inline-block',
                  padding: '18px 42px',
                  fontSize: '1.15rem',
                  background: 'linear-gradient(124deg, var(--ifm-color-primary), var(--ifm-color-primary-light))',
                  color: 'white',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  boxShadow: 'var(--card-shadow-light)',
                  position: 'relative',
                  overflow: 'hidden',
                  letterSpacing: '0.02em'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-light)';
                }}
              >
                Start Reading the Book
              </Link>
            </div>
          </div>
        </section>

        {/* Modules Section - remains neutral and clean */}
        <section style={{
          padding: '0 20px 80px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, var(--ifm-color-primary), var(--ifm-color-primary-light))',
              borderRadius: '2px',
              opacity: '0.4'
            }}></div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                fontWeight: '700',
                background: 'linear-gradient(124deg, var(--ifm-color-primary), var(--ifm-color-primary-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
                lineHeight: '1.3',
                position: 'relative'
              }}
            >
              Course Modules
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--ifm-color-gray-600)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}
            >
              Explore all modules of the Physical AI & Humanoid Robotics textbook.
              Each module covers essential topics for mastering robotics and AI concepts.
            </p>
          </div>

          <div className="row" style={{
            gap: '2.5rem',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}>
            {modulesData.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
