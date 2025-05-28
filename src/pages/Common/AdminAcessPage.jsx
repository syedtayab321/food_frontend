import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccessPage = () => {
  const navigate = useNavigate();

  const handleRegisterAsSeller = () => {
    navigate('/seller-registration');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard Access</h1>
          <p className="text-gray-600">
            To access the admin dashboard and manage all vendor data, you need to register as a seller first.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-blue-800 mb-2">Why become a seller?</h2>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Access to complete admin dashboard</li>
              <li>• Manage your products and inventory</li>
              <li>• View sales analytics and reports</li>
              <li>• Process customer orders</li>
            </ul>
          </div>

          <button
            onClick={handleRegisterAsSeller}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Register as Seller
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already a seller?{' '}
            <button 
              onClick={() => navigate('/')} 
              className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAccessPage;