import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddHotel.module.css';

function AddHotels() {
  const [hotelData, setHotelData] = useState({
    hotel_name: '',
    location: '',
    address: '',
    parking: '',
    wifi: '',
    room_service: '',
    swimming_pool: '',
    fitness_center: '',
    dining: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!hotelData.hotel_name) newErrors.hotel_name = 'Hotel name is required';
    if (!hotelData.location) newErrors.location = 'Location is required';
    if (!hotelData.address) newErrors.address = 'Address is required';
    if (!hotelData.parking) newErrors.parking = 'Parking selection is required';
    if (!hotelData.wifi) newErrors.wifi = 'WiFi selection is required';
    if (!hotelData.room_service) newErrors.room_service = 'Room service selection is required';
    if (!hotelData.swimming_pool) newErrors.swimming_pool = 'Swimming pool selection is required';
    if (!hotelData.fitness_center) newErrors.fitness_center = 'Fitness center selection is required';
    if (!hotelData.dining) newErrors.dining = 'Dining selection is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const ownerId = sessionStorage.getItem('owner_id');
    const data = {
      ...hotelData,
      parking: hotelData.parking === 'Available' ? '1' : '0',
      wifi: hotelData.wifi === 'Available' ? '1' : '0',
      room_service: hotelData.room_service === 'Available' ? '1' : '0',
      swimming_pool: hotelData.swimming_pool === 'Available' ? '1' : '0',
      fitness_center: hotelData.fitness_center === 'Available' ? '1' : '0',
      dining: hotelData.dining === 'Available' ? '1' : '0',
      owner_id: parseInt(ownerId)
    };

    try {
      const response = await axios.post('http://localhost:3000/api/owner/dashboard/add-new-hotel', data, {
        withCredentials: true
      });

      if (response.status === 200) {
        setMessage('Hotel added successfully!');
        setHotelData({
          hotel_name: '',
          location: '',
          address: '',
          parking: '',
          wifi: '',
          room_service: '',
          swimming_pool: '',
          fitness_center: '',
          dining: ''
        });
      } else {
        setMessage('Failed to add hotel');
      }
    } catch (error) {
      console.error('Error adding hotel:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h2>Add New Hotel</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="hotel_name"
              value={hotelData.hotel_name}
              onChange={handleChange}
              placeholder="Hotel Name"
              className={errors.hotel_name ? styles.inputError : ''}
            />
            {errors.hotel_name && <span className={styles.error}>{errors.hotel_name}</span>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="location"
              value={hotelData.location}
              onChange={handleChange}
              placeholder="Location"
              className={errors.location ? styles.inputError : ''}
            />
            {errors.location && <span className={styles.error}>{errors.location}</span>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="address"
              value={hotelData.address}
              onChange={handleChange}
              placeholder="Address"
              className={errors.address ? styles.inputError : ''}
            />
            {errors.address && <span className={styles.error}>{errors.address}</span>}
          </div>
          <div className={styles.formGroup}>
            <select
              name="parking"
              value={hotelData.parking}
              onChange={handleChange}
              className={errors.parking ? styles.inputError : ''}
            >
              <option value="">Parking</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.parking && <span className={styles.error}>{errors.parking}</span>}
          </div>
          <div className={styles.formGroup}>
            <select
              name="wifi"
              value={hotelData.wifi}
              onChange={handleChange}
              className={errors.wifi ? styles.inputError : ''}
            >
              <option value="">WiFi</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.wifi && <span className={styles.error}>{errors.wifi}</span>}
          </div>
          <div className={styles.formGroup}>
            <select
              name="room_service"
              value={hotelData.room_service}
              onChange={handleChange}
              className={errors.room_service ? styles.inputError : ''}
            >
              <option value="">Room Service</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.room_service && <span className={styles.error}>{errors.room_service}</span>}
          </div>
          <div className={styles.formGroup}>
            <select
              name="swimming_pool"
              value={hotelData.swimming_pool}
              onChange={handleChange}
              className={errors.swimming_pool ? styles.inputError : ''}
            >
              <option value="">Swimming Pool</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.swimming_pool && <span className={styles.error}>{errors.swimming_pool}</span>}
          </div>
          <div className={styles.formGroup}>
            <select
              name="fitness_center"
              value={hotelData.fitness_center}
              onChange={handleChange}
              className={errors.fitness_center ? styles.inputError : ''}
            >
              <option value="">Fitness Center</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.fitness_center && <span className={styles.error}>{errors.fitness_center}</span>}
          </div>
          <div className={styles.formGroup}>
            <select
              name="dining"
              value={hotelData.dining}
              onChange={handleChange}
              className={errors.dining ? styles.inputError : ''}
            >
              <option value="">Dining</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.dining && <span className={styles.error}>{errors.dining}</span>}
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Add Hotel</button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddHotels;
