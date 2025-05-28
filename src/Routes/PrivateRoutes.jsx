// src/components/RoleBasedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './../components/common/LoadingSpinner';
export const SellerRoute = () => {
  const { isAuthenticated, isSeller, userDataLoaded } = useSelector((state) => state.auth);
  
  if (!userDataLoaded) {
     return <div>Loading...</div>; // Or your loading component
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  if (!isSeller) {
    return <Navigate to="/admin-access" replace />;
  }
  
  return <Outlet />;
};

export const AuthenticatedRoute = () => {
  const { isAuthenticated, userDataLoaded } = useSelector((state) => state.auth);
  
  if (!userDataLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

export const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/admin-access" replace />;
  }
  
  return <Outlet />;
};