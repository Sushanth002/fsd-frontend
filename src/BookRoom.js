import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './BookRoom.module.css';

function BookRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel_id, room_id, checkinDate, checkoutDate, noOfRooms } = location.state;
  const [userId] = useState(sessionStorage.getItem('user_id')); // Assuming user_id is stored in session storage
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleAddCharge = () => {
    setAdditionalCharges([...additionalCharges, { age: '' }]);
  };

  const handleAgeChange = (index, value) => {
    const newCharges = [...additionalCharges];
    newCharges[index].age = value;
    setAdditionalCharges(newCharges);
  };

  const handleSubmit = async () => {
    const charges = additionalCharges.filter(charge => charge.age).map(charge => [room_id, charge.age]);
    try {
      const response = await axios.post('http://localhost:3000/api/user/newbooking', {
        hotel_id,
        user_id:parseInt(userId),
        no_rooms: noOfRooms,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        rooms: [room_id],
        additionalCharges: charges
      },{
        withCredentials: true,
      });
      if (response.data.success) {
        setBookingDetails(response.data.data);
      } else {
        console.error('Failed to book room');
      }
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  return (
    <div className={styles.bookingContainer}>
      {bookingDetails ? (
        <div className={styles.bookingDetails}>
          <h2>Booking Successful</h2>
          <p><strong>Booking ID:</strong> {bookingDetails[0].booking_id}</p>
          <p><strong>Hotel ID:</strong> {bookingDetails[0].hotel_id}</p>
          <p><strong>User ID:</strong> {bookingDetails[0].user_id}</p>
          <p><strong>No. of Rooms:</strong> {bookingDetails[0].no_rooms}</p>
          <p><strong>Total Amount:</strong> {bookingDetails[0].total_booking_amount}</p>
          <p><strong>Check-in Date:</strong> {bookingDetails[0].checkin_date}</p>
          <p><strong>Check-out Date:</strong> {bookingDetails[0].checkout_date}</p>
          <button onClick={() => navigate('/payment')}>Proceed to Payment</button>
        </div>
      ) : (
        <div className={styles.bookingForm}>
          <h2>Book Room</h2>
          <button onClick={handleAddCharge}>Add Additional Charges</button>
          {additionalCharges.map((charge, index) => (
            <div key={index} className={styles.chargeField}>
              <label>Age of Person {index + 1}:</label>
              <input
                type="number"
                value={charge.age}
                onChange={(e) => handleAgeChange(index, e.target.value)}
                min="1"
                max="100"
              />
              {charge.age && (charge.age < 1 || charge.age > 100) && (
                <span className={styles.error}>Age should be between 1 to 100</span>
              )}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default BookRoom;
