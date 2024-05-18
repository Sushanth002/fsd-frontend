import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './UpdateRoom.module.css';

const UpdateRoom = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState({});
  const [message, setMessage] = useState('');
  const ownerId = sessionStorage.getItem('owner_id');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/owner/dashboard/get-room/${roomId}`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.success) {
          setRoomDetails(response.data.data);
        } else {
          setMessage('Failed to fetch room details');
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRoomDetails = {
      owner_id: parseInt(ownerId),
      room_id: roomId,
      ...roomDetails,
    };

    try {
      const response = await axios.put('http://localhost:3000/api/owner/dashboard/update-room', updatedRoomDetails, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        setMessage('Room updated successfully');
      } else {
        setMessage('Failed to update room');
      }
    } catch (error) {
      console.error('Error updating room:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Update Room</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Room Size</label>
          <input
            type="number"
            name="room_size"
            value={roomDetails.room_size || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Bed Size</label>
          <select name="bed_size" value={roomDetails.bed_size || ''} onChange={handleInputChange} required>
            <option value="SINGLE_BED">SINGLE_BED</option>
            <option value="DOUBLE_BED">DOUBLE_BED</option>
            <option value="KINGSIZE_BED">KINGSIZE_BED</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Max People Accommodate</label>
          <input
            type="number"
            name="max_people_accomodate"
            value={roomDetails.max_people_accomodate || ''}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Base Fare</label>
          <input
            type="number"
            name="base_fare"
            value={roomDetails.base_fare || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>AC</label>
          <select name="ac_non_ac" value={roomDetails.ac_non_ac ? '1' : '0'} onChange={handleInputChange} required>
            <option value="1">Available</option>
            <option value="0">Not Available</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Update Room</button>
      </form>
    </div>
  );
};

export default UpdateRoom;
