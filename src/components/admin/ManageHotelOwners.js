import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageUsers.module.css';

function ManageHotelOwners() {
  const [owners, setOwners] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/dashboard/get-all-owner',{
            withCredentials: true,
          });
        if (response.status === 200 && response.data.success) {
          setOwners(response.data.data);
        } else {
          setMessage('Failed to fetch owners');
        }
      } catch (error) {
        console.error('Error fetching owners:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchOwners();
  }, []);

  const handleDeleteOwner = async (ownerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this owner?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/admin/dashboard/delete-owner/${ownerId}`,{
            withCredentials: true,
          });
        if (response.status === 200 && response.data.success) {
          setOwners(owners.filter(owner => owner.owner_id !== ownerId));
          setMessage('Owner Deleted Successfully');
        } else {
          setMessage('Failed to delete owner');
        }
      } catch (error) {
        console.error('Error deleting owner:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Hotel Owners</h2>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.userList}>
        {owners.length > 0 ? (
          owners.map((owner) => (
            <div key={owner.owner_id} className={styles.card}>
              <h3>{owner.owner_name}</h3>
              <p><strong>Email:</strong> {owner.email}</p>
              <p><strong>Gender:</strong> {owner.gender}</p>
              <p><strong>Contact No:</strong> {owner.contact_no}</p>
              <p><strong>Address:</strong> {owner.address}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteOwner(owner.owner_id)}
              >
                Delete Owner
              </button>
            </div>
          ))
        ) : (
          <p>No owners found</p>
        )}
      </div>
    </div>
  );
}

export default ManageHotelOwners;
