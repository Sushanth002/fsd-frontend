import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/admin/AdminDashboard';
import Navbar from './components/Navbar';
import UserRegister from './components/user/UserRegister';
import UserLogin from './components/user/UserLogin';
import UserDashboard from './components/user/UserDashboard';
import UserProtectedRoute from './components/user/UserProtectedRoute';
import UpdateInfo from './components/user/UpdateInfo';
import PastBookings from './components/user/PastBookings';
import PostReview from './components/user/PostReview';
import CurrentBookings from './components/user/CurrentBookings';
import OwnerRegister from './components/hotelOwner/OwnerRegister';
import OwnerLogin from './components/hotelOwner/OwnerLogin';
import OwnerProtectedRoute from './components/hotelOwner/OwnerProtectedRoute';
import OwnerDashboard from './components/hotelOwner/OwnerDashboard';
import UpdateOwnerInfo from './components/hotelOwner/UpdateOwnerInfo';
import AddHotels from './components/hotelOwner/AddHotels';
import OwnerHotels from './components/hotelOwner/OwnerHotels';
import UpdateHotel from './components/hotelOwner/UpdateHotel';
import PastBookingsByHotel from './components/hotelOwner/PastBookingsByHotel';
import CurrentBookingsByHotel from './components/hotelOwner/CurrentBookingsByHotel';
import AddRooms from './components/hotelOwner/AddRooms';
import AddRoomForm from './components/hotelOwner/AddRoomForm';
import ViewRooms from './components/hotelOwner/ViewRooms';
import ViewRoomsManage from './components/hotelOwner/ViewRoomsManage';
import UpdateRoom from './components/hotelOwner/UpdateRoom';
import AdminLogin from './components/admin/AdminLogin';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminProfile from './components/admin/AdminProfile';
import ManageUsers from './components/admin/ManageUsers';
import ManageHotelOwners from './components/admin/ManageHotelOwners';





const routing = (
  <Router>
    <hr />
    <Navbar/>
    <hr />

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/admin-login" element={<AdminLogin />} />


      <Route path="/admin-dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      }>
        {/* Nested routes */}
        <Route path="admin-profile" element={<AdminProfile />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-hotel-owners" element={<ManageHotelOwners />} />
      </Route>

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/user-login" element={<UserLogin />} />

      <Route path="/user-dashboard" element={
        <UserProtectedRoute>
          <UserDashboard />
        </UserProtectedRoute>
      }>
        {/* Nested routes */}
        <Route path="update-info" element={<UpdateInfo />} />
        <Route path="past-bookings" element={<PastBookings />} />
        <Route path="current-bookings" element={<CurrentBookings />} />
      </Route>

      <Route path="/post-review/:bookingId" element={<PostReview />} />
      <Route path="/owner-register" element={<OwnerRegister />} />
      <Route path="/owner-login" element={<OwnerLogin />} />
      
      <Route path="/owner-dashboard" element={
        <OwnerProtectedRoute>
          <OwnerDashboard />
        </OwnerProtectedRoute>
      }>
        {/* Nested routes */}
        <Route path="update-owner-info" element={<UpdateOwnerInfo />} />
        <Route path="add-hotels" element={<AddHotels />} />
        <Route path="owner-hotels" element={<OwnerHotels />} />
        <Route path="add-rooms" element={<AddRooms />} />
        <Route path="view-rooms" element={<ViewRooms />} />
        
      </Route>
      <Route path="update-hotel/:hotelId" element={<UpdateHotel />} />
      <Route path="/past-bookings/:hotelId" element={<PastBookingsByHotel />} />
      <Route path="/current-bookings/:hotelId" element={<CurrentBookingsByHotel />} />
      <Route path="/add-room-form/:hotelId" element={<AddRoomForm />} />
      <Route path="/view-rooms-manage/:hotelId" element={<ViewRoomsManage />} />
      <Route path="/update-room/:roomId" element={<UpdateRoom />} />
      
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
