// components/Header.jsx
import React from 'react';

const Header = ({ title, userName }) => {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Welcome, {userName}</span>
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;