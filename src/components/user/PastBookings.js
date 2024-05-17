import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './PastBookings.module.css';

function PastBookings() {
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/dashboard/booking/past-bookings/get-by-user/${userId}`, {
          withCredentials: true
        });
        setPastBookings(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching past bookings:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostReview = (bookingId) => {
    navigate(`/post-review/${bookingId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Past Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pastBookings.length === 0 ? (
        <p>No past bookings found.</p>
      ) : (
        <div className={styles.cardContainer}>
          {pastBookings.map(booking => (
            <div key={booking.booking_id} className={styles.card}>
              <h3>Booking ID: {booking.booking_id}</h3>
              <p>Hotel ID: {booking.hotel_id}</p>
              <p>User ID: {booking.user_id}</p>
              <p>Number of Rooms: {booking.no_rooms}</p>
              <p>Total Booking Amount: {booking.total_booking_amount}</p>
              <p>Check-in Date: {booking.checkin_date}</p>
              <p>Checkout Date: {booking.checkout_date}</p>
              <p>Booking Status: {booking.booking_status}</p>
              <button onClick={() => handlePostReview(booking.booking_id)} className={styles.reviewButton}>Post Review</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PastBookings;
