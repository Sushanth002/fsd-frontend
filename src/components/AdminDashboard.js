import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/dashboard/get-all-user', {
        withCredentials: true // Include credentials in the request
      });
      setUsers(response.data.data); // Assuming response.data.data contains the list of users
    } catch (error) {
      setError(error.response.data.message); // Assuming error.response.data.message contains the error message
    }
  };


  const getAllOwners = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/dashboard/get-all-owner', {
        withCredentials: true // Include credentials in the request
      });
      setOwners(response.data.data); // Assuming response.data.data contains the list of owners
    } catch (error) {
      setError(error.response.data.message); // Assuming error.response.data.message contains the error message
    }
  };


  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/dashboard/delete-user/${userId}`, {
        withCredentials: true // Include credentials in the request
      });
      console.log(response.data.message); // Log success message
      // Remove the deleted user from the users state
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Delete user failed:', error.response.data.message); // Log error message
    }
  };

  const deleteOwner = async (ownerId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/dashboard/delete-owner/${ownerId}`, {
        withCredentials: true // Include credentials in the request
      });
      console.log(response.data.message); // Log success message
      // Remove the deleted owner from the owners state
      setOwners(owners.filter(owner => owner.owner_id !== ownerId));
    } catch (error) {
      console.error('Delete owner failed:', error.response.data.message); // Log error message
    }
  };

  const confirmDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const confirmDeleteOwner = (ownerId) => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      deleteOwner(ownerId);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Welcome to Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={getAllUsers}>Get All Users</button>  |   
      <button onClick={getAllOwners}>Get All Owners</button>
      <hr />
      <table border="2" width="500" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact No</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.contact_no}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => confirmDelete(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>

      <h2 style={{ textAlign: 'center' }}>Hotel Owners Details</h2>
      <table border="2" width="600" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Owner ID</th>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact No</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(owner => (
            <tr key={owner.owner_id}>
              <td>{owner.owner_id}</td>
              <td>{owner.owner_name}</td>
              <td>{owner.email}</td>
              <td>{owner.gender}</td>
              <td>{owner.contact_no}</td>
              <td>{owner.address}</td>
              <td>
                <button onClick={() => confirmDeleteOwner(owner.owner_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default AdminDashboard;
