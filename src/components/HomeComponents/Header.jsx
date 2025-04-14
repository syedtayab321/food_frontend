import React, { useState } from "react";
import LogoutModal from './../../Models/Common/LogoutModal';
import { useNavigate } from "react-router-dom";

const Header = ({ title, userName }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async() => {
      navigate("/");
      setIsLogoutOpen(false);
    };

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Welcome, {userName}</span>
            <button 
              onClick={() => setIsLogoutOpen(true)}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;