// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="nav-links">
        <li className="dropdown">
          <Link to="#" className="dropbtn">Admin</Link>
          <div className="dropdown-content">
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            <Link to="/admin-register">Admin Register</Link>
          </div>
        </li>
        <li className="dropdown">
          <Link to="#" className="dropbtn">Hotel Owner</Link>
          <div className="dropdown-content">
            <Link to="/hotel-owner-dashboard">Hotel Owner Dashboard</Link>
          </div>
        </li>
      </ul>
      <ul className="nav-links-right">
        <li>
          <Link to="/user-login">Login</Link>
        </li>
        <li>
          <Link to="/user-register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
