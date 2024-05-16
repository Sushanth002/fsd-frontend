import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState(""); // State variable to hold login result message
  const navigate = useNavigate();

  async function loginButton_click() {
    
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        admin_email: email,
        admin_password: password
      }, {
        withCredentials: true // Include credentials in the request
      });
      console.log('User logged in successfully:', response.data);
      setLoginResult("Login successful");

      navigate('/admin-dashboard');
  
      // Check if the server response includes the Set-Cookie header
      
    } catch (error) {
      console.error('Login failed:', error);
      setLoginResult("Login failed. Please check your credentials.");
    }
  }

  return (
    <>
      <fieldset>
        <legend>Admin Login</legend>

        <label>Email Id  : </label>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br /><br />

        <label>Password  : </label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br /><br />

        <input type="button" onClick={loginButton_click} value="Login" />
        <p style={{ color: "red" }}>{loginResult}</p> {/* Display login result */}
      </fieldset>
    </>
  );
}

export default AdminLogin;
