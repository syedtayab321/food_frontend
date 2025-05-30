import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BASE_URL } from '../../Api/apiConfig';
const MenuItemsGrid = ({ items, onEditItem, onDeleteItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No items found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {items.map((item) => {
        // Get the first image if available
        const imageUrl = item.images?.length > 0 
          ? `${BASE_URL || ''}${item.images[0].image}`
          : null;

        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={item.title} 
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
            ) : (
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4">
              {/* Rest of your card content remains the same */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  ${item.unit_price}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2 truncate">
                {item.description || 'No description available'}
              </p>
              <p className="text-gray-500 text-xs">
                Stock: {item.inventory}
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  onClick={() => onEditItem(item)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemsGrid;