import React from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

const SearchAndAddBar = ({ searchQuery, setSearchQuery, onAddItem, onAddCategory }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search menu items..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Button Group */}
      <div className="flex gap-3 w-full md:w-auto">
        <button
          onClick={onAddCategory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex-1 md:flex-none justify-center"
        >
          <FaPlus className="text-sm" /> 
          <span className="whitespace-nowrap">Add Category</span>
        </button>
        <button
          onClick={onAddItem}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex-1 md:flex-none justify-center"
        >
          <FaPlus className="text-sm" /> 
          <span className="whitespace-nowrap">Add Item</span>
        </button>
      </div>
    </div>
  );
};

export default SearchAndAddBar;