import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your submission logic here
    console.log('Form submitted:', formData);
    // Clear the form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  const buttonClick = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            style={styles.input}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
      <button onClick={buttonClick} style={styles.button}>Go to Home</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px auto',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url('/Images/Banner.jpg')`, // Add your background image path here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  },
  formContainer: {
    width: '100%',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    height: '150px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Contact;
