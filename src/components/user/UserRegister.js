import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserRegister.module.css'; // Import the CSS module

function UserRegister() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_name: '',
    password: '',
    confirmPassword: '',
    email: '',
    gender: '',
    contact_no: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Validate inputs
    const { user_name, password, confirmPassword, email, gender, contact_no, address } = userData;
    const newErrors = {};
    if (!user_name.trim()) {
      newErrors.user_name = 'Username is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/.test(password)) {
      newErrors.password = 'Password must contain 8 to 15 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!gender.trim()) {
      newErrors.gender = 'Gender is required';
    }
    if (!contact_no.trim()) {
      newErrors.contact_no = 'Contact number is required';
    } else if (!/^\d{10}$/.test(contact_no)) {
      newErrors.contact_no = 'Contact number must be 10 digits';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all inputs are valid, send a POST request to your API
    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully');
        navigate('/user-login');
      } else {
        alert(data.message || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h2>Welcome to User Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input type="text" name="user_name" value={userData.user_name} onChange={handleChange} placeholder="Username" />
            {errors.user_name && <span className={styles.error}>{errors.user_name}</span>}
          </div>
          <div className={styles.formGroup}>
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <div className={styles.formGroup}>
            <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>
          <div className={styles.formGroup}>
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <select name="gender" value={userData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && <span className={styles.error}>{errors.gender}</span>}
          </div>
          <div className={styles.formGroup}>
            <input type="text" name="contact_no" value={userData.contact_no} onChange={handleChange} placeholder="Contact Number" />
            {errors.contact_no && <span className={styles.error}>{errors.contact_no}</span>}
          </div>
          <div className={styles.formGroup}>
            <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" />
            {errors.address && <span className={styles.error}>{errors.address}</span>}
          </div>
          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
