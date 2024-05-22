import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <div style={styles.content}>
        <p>Welcome to our website! We are dedicated to providing you with the best experience for finding hotels and booking your stay.</p>
        <p>Our mission is to make your travel planning process as smooth as possible. Whether you're looking for a cozy boutique hotel or a luxurious resort, we've got you covered.</p>
        <p>With our user-friendly interface and extensive database of hotels, you can easily search, compare, and book your ideal accommodation.</p>
        <p>Thank you for choosing us for your travel needs. We look forward to serving you!</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'LightPink',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px auto',
    maxWidth: '800px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  content: {
    lineHeight: '1.6',
  },
};

export default About;
