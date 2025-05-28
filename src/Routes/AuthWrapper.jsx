// src/components/AuthWrapper.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './../Services/Auth/authSlice';
import LoadingSpinner from './../components/common/LoadingSpinner';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return children;
};

export default AuthWrapper;