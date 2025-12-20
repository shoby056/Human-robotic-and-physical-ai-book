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
          Go to Module →
        </Link>
      </div>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <Layout
      title="Course Modules"
      description="Physical AI & Humanoid Robotics textbook modules">
      <main className={styles.modulesPage}>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <h1 className={styles.pageTitle}>Course Modules</h1>
              <p className={styles.pageDescription}>
                Explore all modules of the Physical AI & Humanoid Robotics textbook.
                Each module covers essential topics for mastering robotics and AI concepts.
              </p>
            </div>
          </div>

          <div className="row">
            {modulesData.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}