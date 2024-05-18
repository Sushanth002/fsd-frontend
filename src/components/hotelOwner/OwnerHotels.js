import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './OwnerHotels.module.css';

const OwnerHotels = () => {
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

      console.log('Owner ID:', ownerId); // Debugging line
      try {
        const response = await axios.get(`http://localhost:3000/api/owner/dashboard/get-hotel/${ownerId}`, {
          withCredentials: true,
        });
        console.log('API Response:', response); // Debugging line
        if (response.status === 200 && response.data.success) {
          setHotels(response.data.data); // Set the data correctly
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

  const handlePastBookingsClick = (hotelId) => {
    navigate(`/past-bookings/${hotelId}`);
  };

  const handleCurrentBookingsClick = (hotelId) => {
    navigate(`/current-bookings/${hotelId}`);
  };

  return (
    <div className={styles.container}>
      <h2>Owner Hotels</h2>
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
                <Link to={`/update-hotel/${hotel.hotel_id}`}>
                  <button className={styles.button}>Update Hotel</button>
                </Link>

                
                <button className={styles.button} onClick={() => handlePastBookingsClick(hotel.hotel_id)}>Past Bookings</button>
                
                
                <button className={styles.button} onClick={() => handleCurrentBookingsClick(hotel.hotel_id)}>Current Bookings</button>
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

export default OwnerHotels;
