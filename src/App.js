import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [noOfRooms, setNoOfRooms] = useState('');
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};
    if (!location) newErrors.location = 'Location is required';
    if (!checkinDate) newErrors.checkinDate = 'Check-in date is required';
    if (!checkoutDate) newErrors.checkoutDate = 'Check-out date is required';
    if (!noOfRooms || isNaN(noOfRooms) || noOfRooms < 1 || noOfRooms > 10) {
      newErrors.noOfRooms = 'Number of rooms must be between 1 and 10';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (validateForm()) {
      navigate('/search-hotels', {
        state: {
          inputLocation: location,
          inputCheckinDate: checkinDate,
          inputCheckoutDate: checkoutDate,
          inputNoOfRooms: noOfRooms,
        }
      });
    }
  };

  return (
    <div className="app-container">
      <h2>Welcome to Cozy Haven Stay</h2>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <img src="/Images/Banner.jpg" alt="Carousel 1" />
        </div>
        <div>
          <img src="/Images/Banner.jpg" alt="Carousel 2" />
        </div>
        <div>
          <img src="/Images/Banner.jpg" alt="Carousel 3" />
        </div>
      </Carousel>

      <div className="search-container">
        <div className="search-background">
          <h3>Search Hotels</h3>
          <div className="search-form">
            <div>
              <label>Location:</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
              </select>
              {errors.location && <span className="error">{errors.location}</span>}
            </div>
            <div>
              <label>Check-in Date:</label>
              <input
                type="date"
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.checkinDate && <span className="error">{errors.checkinDate}</span>}
            </div>
            <div>
              <label>Check-out Date:</label>
              <input
                type="date"
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.checkoutDate && <span className="error">{errors.checkoutDate}</span>}
            </div>
            <div>
              <label>Number of Rooms:</label>
              <input
                type="number"
                value={noOfRooms}
                onChange={(e) => setNoOfRooms(e.target.value)}
                min="1"
                max="10"
              />
              {errors.noOfRooms && <span className="error">{errors.noOfRooms}</span>}
            </div>
            <button onClick={handleSearch}>Search Hotels</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
