import React, { useState } from 'react';
import { FaTimes, FaUtensils } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
// import { addNewCategory } from '../../features/categories/categoriesSlice';
import { addNewCategory } from '../../Services/MenuItems/categorySlice';

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const resultAction = await dispatch(addNewCategory(categoryName));
      if (addNewCategory.fulfilled.match(resultAction)) {
        setCategoryName('');
        onClose();
      } else if (addNewCategory.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message || 'Failed to add category');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;