import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation  } from 'react-router-dom';
import styles from '../user/UserDashboard.module.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/admin-dashboard') {
      navigate('admin-profile');
    }
  }, [location, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_id');
    navigate('/');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>Welcome to Admin Dashboard</h2>
        <nav className={styles.navMenu}>
          <ul>
            <li><Link to="admin-profile" className={styles.navLink}>Profile</Link></li>
            <li><Link to="manage-users" className={styles.navLink}>Manage Users</Link></li>
            <li><Link to="manage-hotel-owners" className={styles.navLink}>Manage Hotel Owners</Link></li>
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

export default AdminDashboard;
