import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminService from '../../services/admin.service';
import styles from './AdminProfile.module.css';

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const adminId = sessionStorage.getItem('admin_id');
      if (!adminId) {
        setMessage('Admin ID not found in session storage');
        return;
      }

      try {
        const data = await adminService.getAdminDetails(adminId);
        if (data.success) {
          setAdminDetails(data.data);
        } else {
          setMessage('Failed to fetch admin details');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h2>Admin Profile</h2>
      {message && <p className={styles.message}>{message}</p>}
      {adminDetails ? (
        <div className={styles.profileDetails}>
          <p><strong>ID:</strong> {adminDetails.admin_id}</p>
          <p><strong>Name:</strong> {adminDetails.admin_name}</p>
          <p><strong>Email:</strong> {adminDetails.admin_email}</p>
          <p><strong>Phone Number:</strong> {adminDetails.admin_phoneno}</p>
        </div>
      ) : (
        <p>Loading admin details...</p>
      )}
    </div>
  );
};

export default AdminProfile;
