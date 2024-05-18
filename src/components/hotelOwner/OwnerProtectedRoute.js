import React from 'react';
import { Navigate } from 'react-router-dom';

const OwnerProtectedRoute = ({ children }) => {
  const ownerId = sessionStorage.getItem('owner_id');

  if (!ownerId) {
    // owner is not authenticated, redirect to login page
    return <Navigate to="/owner-login" replace />;
  }

  // Owner is authenticated, render the children components
  return children;
};

export default OwnerProtectedRoute;
