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
          <Link to="/admin-login" className="dropbtn">Admin Login</Link>

          <div className="dropdown-content">
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            
          </div>

        </li>
        
        <li className="dropdown">
          <Link to="/owner-login" className="dropbtn">Hotel Owner Login</Link>

          <div className="dropdown-content">
            <Link to="/owner-register">Hotel Owner Register</Link>
            <Link to="/owner-dashboard">Hotel Owner Dashboard</Link>
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
          <Link to="/user-dashboard" className="go-to-dashboard">Dashboard</Link>
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
