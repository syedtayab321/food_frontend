import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center border-2 border-red-500 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You must be logged in to view the dashboard and access all data.
        </p>
        <button
          onClick={handleLogin}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-200"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
