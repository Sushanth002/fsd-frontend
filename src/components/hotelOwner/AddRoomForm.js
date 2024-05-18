import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AddRoomForm.module.css';

const AddRoomForm = () => {
  const { hotelId } = useParams();
  const [roomSize, setRoomSize] = useState('');
  const [bedSize, setBedSize] = useState('SINGLE_BED');
  const [maxPeople, setMaxPeople] = useState(1);
  const [baseFare, setBaseFare] = useState('');
  const [acNonAc, setAcNonAc] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = sessionStorage.getItem('owner_id');
    if (!ownerId) {
      setMessage('Owner ID not found in session storage');
      return;
    }

    const newRoom = {
      owner_id: parseInt(ownerId),
      room_size: roomSize,
      bed_size: bedSize,
      max_people_accomodate: maxPeople,
      base_fare: baseFare,
      ac_non_ac: acNonAc,
      hotel_id: hotelId
    };

    try {
      const response = await axios.post('http://localhost:3000/api/owner/dashboard/add-new-room', newRoom, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        alert("New Room added successfully");
        setMessage('Room added successfully');
        navigate(`/owner-dashboard`);
      } else {
        setMessage('Failed to add room');
      }
    } catch (error) {
      console.error('Error adding room:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Room</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="roomSize">Room Size</label>
          <input
            type="text"
            id="roomSize"
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bedSize">Bed Size</label>
          <select
            id="bedSize"
            value={bedSize}
            onChange={(e) => setBedSize(e.target.value)}
            required
          >
            <option value="SINGLE_BED">Single Bed</option>
            <option value="DOUBLE_BED">Double Bed</option>
            <option value="KINGSIZE_BED">King Size Bed</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="maxPeople">Max People Accommodate</label>
          <input
            type="number"
            id="maxPeople"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            min="1"
            max="10"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="baseFare">Base Fare</label>
          <input
            type="text"
            id="baseFare"
            value={baseFare}
            onChange={(e) => setBaseFare(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="acNonAc">AC/Non-AC</label>
          <select
            id="acNonAc"
            value={acNonAc}
            onChange={(e) => setAcNonAc(e.target.value)}
            required
          >
            <option value="1">Available</option>
            <option value="0">Not Available</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;
