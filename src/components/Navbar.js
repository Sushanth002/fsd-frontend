// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav>
      
      <div className="logo">
        <Link to="/" ><img class="logo" src="/Images/logo.jpg" width="100%" height="60" alt='logo'/></Link>
      </div>

      <ul className="nav-links">
        
        <li className="dropdown">
          <Link to="/Admin" className="dropbtn">Admin Login</Link>

          <div className="dropdown-content">
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            
          </div>

        </li>
        
        <li className="dropdown">
          <Link to="#" className="dropbtn">Hotel Owner Login</Link>

          <div className="dropdown-content">
            <Link to="/hotel-owner-register">Hotel Owner Register</Link>
            <Link to="/hotel-owner-dashboard">Hotel Owner Dashboard</Link>
          </div>
        </li>

        <li className="contact-us">
        <Link to="/Contact" className="contact-us">Contact Us</Link>
        </li>

        <li className="about-us">
        <Link to="/About"  className="about-us">About Us</Link>
        </li>


      </ul>

      <ul className="nav-links-right">
        <li>
          <Link to="/user-login" className="login">Login</Link>
        </li>
        <li>
          <Link to="/user-register" className="register">Register</Link>
        </li>


        <li className="dropdown">
          <Link to="/user-login" className="dropbtn">Login</Link>

          <div className="dropdown-content">
            <Link to="/user-register">Register</Link>
            <Link to="/user-dashboard">Dashboard</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
