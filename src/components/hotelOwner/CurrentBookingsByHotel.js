import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CurrentBookingsByHotel.module.css';

function CurrentBookingsByHotel() {
  const { hotelId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCurrentBookings = async () => {
      const ownerId = sessionStorage.getItem('owner_id');
      if (!ownerId) {
        setMessage('Owner ID not found in session storage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/owner/dashboard/booking/current-booking/${hotelId}`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.success) {
          setBookings(response.data.data);
        } else {
          setMessage('Failed to fetch current bookings');
        }
      } catch (error) {
        console.error('Error fetching current bookings:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchCurrentBookings();
  }, [hotelId]);

  const handleApproveRefund = async (bookingId) => {
    const ownerId = sessionStorage.getItem('owner_id');
    if (!ownerId) {
      setMessage('Owner ID not found in session storage');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/owner/dashboard/booking/current-booking/update-status`, {
        owner_id: parseInt(ownerId),
        booking_id: parseInt(bookingId),
        booking_status: 'REFUND_APPROVED',
      }, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        setMessage('Booking status updated successfully');
        // Optionally, refresh the bookings list
        setBookings(bookings.map(booking => 
          booking.booking_id === bookingId ? { ...booking, booking_status: 'REFUND_APPROVED' } : booking
        ));
      } else {
        setMessage('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Current Bookings</h2>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.bookingList}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.booking_id} className={styles.card}>
              <p><strong>Booking ID:</strong> {booking.booking_id}</p>
              <p><strong>Number of Rooms:</strong> {booking.no_rooms}</p>
              <p><strong>Total Booking Amount:</strong> ${booking.total_booking_amount}</p>
              <p><strong>Check-in Date:</strong> {new Date(booking.checkin_date).toLocaleDateString()}</p>
              <p><strong>Check-out Date:</strong> {new Date(booking.checkout_date).toLocaleDateString()}</p>
              <p><strong>Booking Status:</strong> {booking.booking_status}</p>
              {booking.booking_status !== 'REFUND_APPROVED' && (
                <button
                  className={styles.button}
                  onClick={() => handleApproveRefund(booking.booking_id)}
                >
                  Approve Refund
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No current bookings found</p>
        )}
      </div>
    </div>
  );
}

export default CurrentBookingsByHotel;
