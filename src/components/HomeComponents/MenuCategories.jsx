// components/MenuCategories.jsx
import React from 'react';

const MenuCategories = ({ categories, onCategoryClick }) => {
  const menuCategories = categories || ['Appetizers', 'Main Courses', 'Desserts'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Menu Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuCategories.map((category) => (
          <div 
            key={category} 
            className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition cursor-pointer"
            onClick={() => onCategoryClick(category)}
          >
            <h3 className="font-bold text-lg text-red-600 mb-2">{category}</h3>
            <p className="text-gray-600 mb-3">12 items</p>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              View Items →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;