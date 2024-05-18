// UpdateHotel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UpdateHotel.module.css';

function UpdateHotel() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchHotelDetails = async () => {
        const ownerId = sessionStorage.getItem('owner_id');
      if (!ownerId) {
        setMessage('Owner ID not found in session storage');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/api/owner/dashboard/get-hotel/${ownerId}`, {
          withCredentials: true
        });

        if (response.status === 200 && response.data.success) {
          setHotelData(response.data.data);
        } else {
          setMessage('Failed to fetch hotel details');
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

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
    if (!ownerId) {
      setMessage('Owner ID not found in session storage');
      return;
    }

    const requestData = {
      ...hotelData,
      hotel_id: hotelId,
      owner_id: parseInt(ownerId)
    };

    try {
      const response = await axios.put('http://localhost:3000/api/owner/dashboard/update-hotel', requestData, {
        withCredentials: true
      });

      if (response.status === 200 && response.data.success) {
        setMessage('Hotel updated successfully!');
        alert('Hotel Updated successfully');
        navigate('/owner-dashboard');
      } else {
        setMessage('Failed to update hotel');
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.updateForm}>
        <h2>Update Hotel</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="hotel_name">Hotel Name:</label>
            <input
              type="text"
              id="hotel_name"
              name="hotel_name"
              value={hotelData.hotel_name}
              onChange={handleChange}
            />
            {errors.hotel_name && <p className={styles.error}>{errors.hotel_name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={hotelData.location}
              onChange={handleChange}
            />
            {errors.location && <p className={styles.error}>{errors.location}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={hotelData.address}
              onChange={handleChange}
            />
            {errors.address && <p className={styles.error}>{errors.address}</p>}
          </div>
          {/* Dropdowns for amenities */}
          <div className={styles.formGroup}>
            <label htmlFor="parking">Parking:</label>
            <select id="parking" name="parking" value={hotelData.parking} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
            {errors.parking && <span className={styles.error}>{errors.parking}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="wifi">WiFi:</label>
            <select id="wifi" name="wifi" value={hotelData.wifi} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
            {errors.wifi && <span className={styles.error}>{errors.wifi}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="room_service">Room Service:</label>
            <select id="room_service" name="room_service" value={hotelData.room_service} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
            {errors.room_service && <span className={styles.error}>{errors.room_service}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="swimming_pool">Swimming Pool:</label>
            <select id="swimming_pool" name="swimming_pool" value={hotelData.swimming_pool} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
            {errors.swimming_pool && <span className={styles.error}>{errors.swimming_pool}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fitness_center">Fitness Center:</label>
            <select id="fitness_center" name="fitness_center" value={hotelData.fitness_center} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
            {errors.fitness_center && <span className={styles.error}>{errors.fitness_center}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dining">Dining:</label>
            <select id="dining" name="dining" value={hotelData.dining} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
            {errors.dining && <span className={styles.error}>{errors.dining}</span>}
          </div>
          <button type="submit" className={styles.button}>Update Hotel</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default UpdateHotel;
