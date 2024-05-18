import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddRooms.module.css';

const AddRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      const ownerId = sessionStorage.getItem('owner_id');
      if (!ownerId) {
        setMessage('Owner ID not found in session storage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/owner/dashboard/get-hotel/${ownerId}`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.success) {
          setHotels(response.data.data);
        } else {
          setMessage('Failed to fetch hotel details');
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchHotels();
  }, []);

  const handleAddRoomClick = (hotelId) => {
    navigate(`/add-room-form/${hotelId}`);
  };

  return (
    <div className={styles.container}>
      <h2>Add Rooms</h2>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.hotelList}>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.hotel_id} className={styles.card}>
              <h3>{hotel.hotel_name}</h3>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Address:</strong> {hotel.address}</p>
              <p><strong>Parking:</strong> {hotel.parking ? 'Available' : 'Not Available'}</p>
              <p><strong>WiFi:</strong> {hotel.wifi ? 'Available' : 'Not Available'}</p>
              <p><strong>Room Service:</strong> {hotel.room_service ? 'Available' : 'Not Available'}</p>
              <p><strong>Swimming Pool:</strong> {hotel.swimming_pool ? 'Available' : 'Not Available'}</p>
              <p><strong>Fitness Center:</strong> {hotel.fitness_center ? 'Available' : 'Not Available'}</p>
              <p><strong>Dining:</strong> {hotel.dining ? 'Available' : 'Not Available'}</p>
              <div className={styles.cardActions}>
                <button className={styles.button} onClick={() => handleAddRoomClick(hotel.hotel_id)}>Add Room</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </div>
    </div>
  );
};

export default AddRooms;
