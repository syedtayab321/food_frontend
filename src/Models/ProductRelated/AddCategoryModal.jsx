import React, { useState } from 'react';
import { FaTimes, FaUtensils } from 'react-icons/fa';

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return;
    
    const newCategory = {
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      icon: <FaUtensils />
    };
    
    onAddCategory(newCategory);
    setCategoryName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="bg-red-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add New Category</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 transition"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Breakfast, Desserts"
              required
              autoFocus
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;