import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ViewRoomsManage.module.css';

const ViewRoomsManage = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/owner/dashboard/get-all-room/${hotelId}`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.success) {
          setRooms(response.data.data);
        } else {
          setMessage('Failed to fetch rooms details');
        }
      } catch (error) {
        console.error('Error fetching rooms details:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleUpdateRoomClick = (roomId) => {
    navigate(`/update-room/${roomId}`);
  };

  const handleDeleteRoomClick = async (roomId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3000/api/owner/dashboard/delete-room/${roomId}`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        setRooms(rooms.filter(room => room.room_id !== roomId));
        setMessage('Room deleted successfully');
      } else {
        setMessage('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Rooms</h2>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.roomList}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.room_id} className={styles.card}>
              <p><strong>Room Size:</strong> {room.room_size}</p>
              <p><strong>Bed Size:</strong> {room.bed_size}</p>
              <p><strong>Max People:</strong> {room.max_people_accomodate}</p>
              <p><strong>Base Fare:</strong> {room.base_fare}</p>
              <p><strong>AC:</strong> {room.ac_non_ac ? 'Available' : 'Not Available'}</p>
              <div className={styles.cardActions}>
                <button className={styles.button} onClick={() => handleUpdateRoomClick(room.room_id)}>Update Room</button>
                <button className={styles.button} onClick={() => handleDeleteRoomClick(room.room_id)}>Delete Room</button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default ViewRoomsManage;
