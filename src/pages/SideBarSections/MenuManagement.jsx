import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaHamburger, FaPizzaSlice, FaIceCream, FaWineGlassAlt,FaUtensils } from 'react-icons/fa';
import AddItemModal from './../../Models/ProductRelated/AddItemModal';
const MenuManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = (newItem) => {
    // Send to API or update state
    console.log("New item:", newItem);
  };

  // State for active tab and search
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample menu data
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'main', price: '$12.99', image: 'pizza.jpg' },
    { id: 2, name: 'Grilled Salmon', category: 'main', price: '$18.99', image: 'salmon.jpg' },
    { id: 3, name: 'Caesar Salad', category: 'appetizer', price: '$8.99', image: 'salad.jpg' },
    { id: 4, name: 'Garlic Bread', category: 'appetizer', price: '$5.99', image: 'bread.jpg' },
    { id: 5, name: 'Chocolate Lava Cake', category: 'dessert', price: '$7.99', image: 'cake.jpg' },
    { id: 6, name: 'Red Wine', category: 'drinks', price: '$9.99', image: 'wine.jpg' },
  ];

  // Filter menu items based on active tab and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categories for tabs
  const categories = [
    { id: 'all', name: 'All Items', icon: <FaHamburger /> },
    { id: 'appetizer', name: 'Appetizers', icon: <FaUtensils /> },
    { id: 'main', name: 'Main Courses', icon: <FaPizzaSlice /> },
    { id: 'dessert', name: 'Desserts', icon: <FaIceCream /> },
    { id: 'drinks', name: 'Drinks', icon: <FaWineGlassAlt /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Menu Management</h1>
        <p className="text-gray-600">Manage your restaurant menu items</p>
      </div>

      {/* Search & Add New Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
         onClick={() => setIsModalOpen(true)}
         className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          <FaPlus /> Add New Item
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg mr-2 whitespace-nowrap transition ${
              activeTab === cat.id
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No items found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Item Image (Placeholder) */}
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                {item.name}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    {item.price}
                  </span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
       <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default MenuManagementPage;