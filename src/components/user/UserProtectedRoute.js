import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const userId = sessionStorage.getItem('user_id');

  if (!userId) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/user-login" replace />;
  }

  // User is authenticated, render the children components
  return children;
};

export default UserProtectedRoute;
