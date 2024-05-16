import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
//import AdminLogin from './components/AdminLogin';




const routing = (
  <Router>
    <hr />
    <Navbar/>


    <div style={{ textAlign: "center" }} >
      <Link to="/">Home</Link> |
      <Link to="/About">About Us</Link> |
      <Link to="/Contact">Contact Us</Link> |
      <Link to="/Admin">Admin Login</Link>
    </div>
    <hr />

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
