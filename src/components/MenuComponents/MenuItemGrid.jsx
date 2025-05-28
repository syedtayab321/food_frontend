import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MenuItemsGrid = ({ items, onEditItem, onDeleteItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No items found. Try a different search.</p>
      </div>
    );
  }

  // Function to handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/300x200?text=No+Image';
    e.target.className = 'w-full h-40 object-contain bg-gray-100';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {items.map((item) => {
        // Get the first image from the images array if it exists
        const itemImage = item.images?.length > 0 ? item.images[0].image : null;
        
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {itemImage ? (
              <img 
                src={itemImage} 
                alt={item.title} 
                className="w-full h-40 object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                <img 
                  src="https://placehold.co/300x200?text=No+Image" 
                  alt="Placeholder" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="p-4">
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