import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CurrentBookings.module.css';

function CurrentBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = sessionStorage.getItem('user_id');
      try {
        const response = await axios.get(`http://localhost:3000/api/user/dashboard/booking/current-booking/${userId}`, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.success) {
          setBookings(response.data.data);
        } else {
          setError('Failed to fetch current bookings');
        }
      } catch (error) {
        setError('An error occurred while fetching bookings');
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const userId = sessionStorage.getItem('user_id');
    const confirmCancel = window.confirm('Are you sure you want to cancel your booking?');
    if (!confirmCancel) {
      return;
    }

    const data = {
      user_id: parseInt(userId, 10),
      booking_id: bookingId,
    };

    try {
      const response = await axios.put('http://localhost:3000/api/user/dashboard/booking/current-booking/cancel-booking', data, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        alert('Booking cancelled successfully!');
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.booking_id !== bookingId));
      } else {
        setError('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.bookingsContainer}>
      <h2>Current Bookings</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.cardsContainer}>
        {bookings.map((booking) => (
          <div key={booking.booking_id} className={styles.card}>
            <h3>Booking ID: {booking.booking_id}</h3>
            <p>Hotel ID: {booking.hotel_id}</p>
            <p>Number of Rooms: {booking.no_rooms}</p>
            <p>Total Amount: ${booking.total_booking_amount}</p>
            <p>Check-in Date: {booking.checkin_date}</p>
            <p>Check-out Date: {booking.checkout_date}</p>
            <p>Status: {booking.booking_status}</p>
            <button
              onClick={() => handleCancelBooking(booking.booking_id)}
              className={styles.cancelButton}
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentBookings;
