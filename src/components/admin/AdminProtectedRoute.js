import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const adminId = sessionStorage.getItem('admin_id');

  if (!adminId) {
    // admin is not authenticated, redirect to login page
    return <Navigate to="/admin-login" replace />;
  }

  // Admin is authenticated, render the children components
  return children;
};

export default AdminProtectedRoute;
