import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../user/UserRegister.module.css'; // Reusing the CSS module for styling

function OwnerLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Validate inputs
    const { email, password } = loginData;
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/.test(password)) {
      newErrors.password = 'Password must contain 8 to 15 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all inputs are valid, send a POST request to the API
    try {
      const response = await axios.post('http://localhost:3000/api/owner/login', loginData, {
        withCredentials: true // Include credentials in the request
      });
      console.log('Owner logged in successfully:', response.data);

      if (response.status === 200) {
        alert('Owner logged in successfully');
        // Store owner_id in sessionStorage or state management tool
        sessionStorage.setItem('owner_id', response.data.data.owner_id);
        // Navigate to owner dashboard
        navigate('/owner-dashboard');
      } else {
        alert(response.data.message || 'Failed to login owner');
      }
    } catch (error) {
      console.error('Error logging in owner:', error);
      alert('Failed to login owner');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h2>Welcome to Owner Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className={errors.password ? styles.inputError : ''}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <button
          onClick={() => navigate('/owner-register')}
          className={`${styles.button} ${styles.registerButton}`}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default OwnerLogin;
