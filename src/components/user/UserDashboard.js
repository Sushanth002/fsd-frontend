import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './UserDashboard.module.css';

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user_id');
    navigate('/user-login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>Welcome to User Dashboard</h2>
        <nav className={styles.navMenu}>
          <ul>
            <li><Link to="update-info" className={styles.navLink}>Update Info</Link></li>
            <li><Link to="past-bookings" className={styles.navLink}>Past Bookings</Link></li>
            <li><Link to="current-bookings" className={styles.navLink}>Current Bookings</Link></li>
            <li><Link to="book-hotel" className={styles.navLink}>Book Hotel</Link></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;
