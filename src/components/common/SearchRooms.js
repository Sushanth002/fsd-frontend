import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SearchRooms.module.css';

function SearchRooms() {
  const location = useLocation();
  const { hotel_id, checkinDate, checkoutDate } = location.state;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/room', {
          hotel_id,
          inputCheckinDate: checkinDate,
          inputCheckoutDate: checkoutDate
        });
        if (response.data.success) {
          setRooms(response.data.data);
        } else {
          console.error('Failed to fetch rooms');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotel_id, checkinDate, checkoutDate]);

  return (
    <div className={styles.roomsContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.room_id} className={styles.roomCard}>
            <img src={`/Images/Room.jpg`} alt={`Room ${room.room_id}`} />
            <h3>Room {room.room_id}</h3>
            <p><strong>Size:</strong> {room.room_size} sq ft</p>
            <p><strong>Bed Size:</strong> {room.bed_size}</p>
            <p><strong>Max People:</strong> {room.max_people_accomodate}</p>
            <p><strong>Base Fare:</strong> {room.base_fare}</p>
            <p><strong>AC:</strong> {room.ac_non_ac ? 'Yes' : 'No'}</p>
            <button onClick={() => navigate('/book-room', {
              state: {
                hotel_id,
                room_id: room.room_id,
                checkinDate,
                checkoutDate,
                noOfRooms: 1
              }
            })}>Book Room</button>
          </div>
        ))
      ) : (
        <h3>No rooms found</h3>
      )}
    </div>
  );
}

export default SearchRooms;
