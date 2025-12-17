import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './404.module.css';

const NotFound = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Page Not Found" description="The requested page could not be found">
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            We couldn't find what you were looking for.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              Go to Homepage
            </Link>
            <Link to="/modules" className={styles.modulesButton}>
              Browse Modules
            </Link>
            <Link to="/urdu" className={styles.urduButton}>
              Urdu Translation
            </Link>
            <Link to="/personalized" className={styles.personalizedButton}>
              Personalized Content
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default NotFound;