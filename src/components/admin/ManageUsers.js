import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageUsers.module.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/dashboard/get-all-user', {
            withCredentials: true,
          });
        if (response.status === 200 && response.data.success) {
          setUsers(response.data.data);
        } else {
          setMessage('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/admin/dashboard/delete-user/${userId}`,{
            withCredentials: true,
          });
        if (response.status === 200 && response.data.success) {
          setUsers(users.filter(user => user.user_id !== userId));
          setMessage('User Deleted Successfully');
        } else {
          setMessage('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Users</h2>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.user_id} className={styles.card}>
              <h3>{user.user_name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Contact No:</strong> {user.contact_no}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteUser(user.user_id)}
              >
                Delete User
              </button>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
