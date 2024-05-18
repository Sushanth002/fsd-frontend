import React, { useState } from 'react';
import axios from 'axios';
import styles from '../user/UpdateInfo.module.css';

function UpdateOwnerInfo() {
  const [ownerName, setOwnerName] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!ownerName) formErrors.ownerName = 'Owner Name is required';
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

    const ownerId = sessionStorage.getItem('owner_id');
    const data = {
      owner_id: parseInt(ownerId),
      owner_name: ownerName,
      gender: gender,
      contact_no: contactNo,
      address: address,
    };

    try {
      const response = await axios.put('http://localhost:3000/api/owner/dashboard/update-owner', data, {
        withCredentials: true, // Include credentials in the request if needed
      });

      if (response.status === 200) {
        setMessage('Owner updated successfully!');
      } else {
        setMessage('Failed to update owner');
      }
    } catch (error) {
      console.error('Error updating owner:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.updateInfoContainer}>
      <h2>Update Owner Info</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            type="text"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className={errors.ownerName ? styles.error : ''}
          />
          {errors.ownerName && <span className={styles.errorMessage}>{errors.ownerName}</span>}
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

export default UpdateOwnerInfo;
