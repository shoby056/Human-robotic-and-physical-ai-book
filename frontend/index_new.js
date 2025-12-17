import React from 'react';
import Layout from '@theme/Layout';
import ChapterSelector from '@site/src/components/ChapterSelector';

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="A complete guide to understanding Physical AI, Robotics, and Humanoid Systems"
    >
      <div
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}
        >
          Physical AI & Humanoid Robotics
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            marginTop: '15px',
            lineHeight: 1.6,
          }}
        >
          Your complete textbook for understanding the future of AI + Robotics.
        </p>

        {/* Header Image */}
        <img
          src="/img/robot-header.png"
          alt="Humanoid Robot"
          style={{
            width: 'clamp(240px, 70%, 700px)',
            marginTop: '35px',
            borderRadius: '12px',
          }}
        />

        {/* Dynamic Chapter Selector */}
        <div style={{ marginTop: '40px' }}>
          <ChapterSelector />
        </div>
      </div>
    </Layout>
  );
}