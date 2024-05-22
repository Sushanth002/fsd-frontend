import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SearchHotels.module.css';

function SearchHotels() {
  const locationState = useLocation().state;
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/search-hotels', locationState);
        if (response.data.success) {
          setHotels(response.data.data);
        } else {
          console.error('Failed to fetch hotels');
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [locationState]);

  return (
    <div className={styles.hotelsContainer}>
      {hotels.map((hotel) => (
        <div key={hotel.hotel_id} className={styles.hotelCard}>
          <img src={`/Images/Banner.jpg`} alt={hotel.hotel_name} />
          <h3>{hotel.hotel_name}</h3>
          <p><strong>Location:</strong> {hotel.location}</p>
          <p><strong>Address:</strong> {hotel.address}</p>
          <p><strong>Parking:</strong> {hotel.parking ? 'Available' : 'Not Available'}</p>
          <p><strong>WiFi:</strong> {hotel.wifi ? 'Available' : 'Not Available'}</p>
          <p><strong>Room Service:</strong> {hotel.room_service ? 'Available' : 'Not Available'}</p>
          <p><strong>Swimming Pool:</strong> {hotel.swimming_pool ? 'Available' : 'Not Available'}</p>
          <p><strong>Fitness Center:</strong> {hotel.fitness_center ? 'Available' : 'Not Available'}</p>
          <p><strong>Dining:</strong> {hotel.dining ? 'Available' : 'Not Available'}</p>
          <button onClick={() => navigate(`/search-rooms/${hotel.hotel_id}`, {
            state: {
              hotel_id: hotel.hotel_id,
              checkinDate: locationState.inputCheckinDate,
              checkoutDate: locationState.inputCheckoutDate
            }
          })}>View Rooms</button>
        </div>
      ))}
    </div>
  );
}

export default SearchHotels;
