import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from '../user/UserDashboard.module.css';

function OwnerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('owner_id');
    navigate('/owner-login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>Welcome to Owner Dashboard</h2>
        <nav className={styles.navMenu}>
          <ul>
            <li><Link to="update-owner-info" className={styles.navLink}>Update Owner Info</Link></li>
            <li><Link to="add-hotels" className={styles.navLink}>Add Hotels</Link></li>
            <li><Link to="get-my-hotels" className={styles.navLink}>Get My Hotels</Link></li>
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

export default OwnerDashboard;
