import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        admin_email: email,
        admin_password: password
      },{
        withCredentials: true // Include credentials in the request
      });

      if (response.status === 200 && response.data.success) {
        alert('Admin logged in successfully');
        sessionStorage.setItem('admin_id', response.data.data.admin_id);
        navigate('/admin-dashboard');
      } else {
        setMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Invalid Emial or Password');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Welcome to Admin Login</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
