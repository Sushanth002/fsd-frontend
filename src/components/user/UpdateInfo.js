import React, { useState } from 'react';
import axios from 'axios';
import styles from './UpdateInfo.module.css';

function UpdateInfo() {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!userName) formErrors.userName = 'User Name is required';
    if (!gender) formErrors.gender = 'Gender is required';
    if (!contactNo || !/^\d{10}$/.test(contactNo)) formErrors.contactNo = 'Valid Contact Number is required';
    if (!address) formErrors.address = 'Address is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userId = sessionStorage.getItem('user_id');
    const data = {
      user_id: parseInt(userId),
      user_name: userName,
      gender: gender,
      contact_no: contactNo,
      address: address,
    };
    

    try {
      const response = await axios.post('http://localhost:3000/api/user/dashboard/update-user', data, {
        withCredentials: true, // Include credentials in the request if needed
      });

      if (response.status === 200) {
        setMessage('User updated successfully!');
      } else {
        setMessage('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.updateInfoContainer}>
      <h2>Update Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={errors.userName ? styles.error : ''}
          />
          {errors.userName && <span className={styles.errorMessage}>{errors.userName}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={errors.gender ? styles.error : ''}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <span className={styles.errorMessage}>{errors.gender}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactNo">Contact Number:</label>
          <input
            type="text"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className={errors.contactNo ? styles.error : ''}
          />
          {errors.contactNo && <span className={styles.errorMessage}>{errors.contactNo}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={errors.address ? styles.error : ''}
          />
          {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>Update Info</button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

export default UpdateInfo;
