import React, { useState } from 'react';
import { FaSearch, FaFilter, FaEnvelope, FaPhone, FaUser, FaRegStar, FaStar } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const CustomersPage = () => {
  // Sample customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      orders: 12,
      lastOrder: '2023-05-15',
      isFavorite: false,
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      orders: 8,
      lastOrder: '2023-05-10',
      isFavorite: true,
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 (555) 456-7890',
      orders: 5,
      lastOrder: '2023-04-28',
      isFavorite: false,
      photo: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily@example.com',
      phone: '+1 (555) 789-0123',
      orders: 15,
      lastOrder: '2023-05-12',
      isFavorite: true,
      photo: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [messageModal, setMessageModal] = useState({ open: false, customer: null });
  const [messageText, setMessageText] = useState('');

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'favorites' && customer.isFavorite) || 
                         (filter === 'frequent' && customer.orders > 10);
    return matchesSearch && matchesFilter;
  });

  // Toggle favorite status
  const toggleFavorite = (customerId) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, isFavorite: !customer.isFavorite } : customer
    ));
  };

  // Send message
  const sendMessage = () => {
    // Here you would typically send the message via API
    console.log(`Message to ${messageModal.customer.name}: ${messageText}`);
    setMessageModal({ open: false, customer: null });
    setMessageText('');
  };

  // Refresh customers
  const refreshCustomers = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-red-600">Customers</h1>
          <p className="text-gray-600">Manage and communicate with your customers</p>
        </div>
        
        <button 
          onClick={refreshCustomers}
          className={`p-2 bg-white rounded-lg border hover:bg-gray-50 ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Customers</option>
              <option value="favorites">Favorites</option>
              <option value="frequent">Frequent (10+ orders)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            No customers found matching your criteria
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={customer.photo} 
                      alt={customer.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{customer.name}</h3>
                      <p className="text-gray-500 text-sm">{customer.orders} orders</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(customer.id)}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    {customer.isFavorite ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-red-500" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-red-500" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUser className="text-red-500" />
                    <span>Last order: {new Date(customer.lastOrder).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setMessageModal({ open: true, customer })}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FaEnvelope /> Message
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Modal */}
      {messageModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-red-600">
                Message {messageModal.customer.name}
              </h2>
              <button 
                onClick={() => setMessageModal({ open: false, customer: null })}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  rows="4"
                  placeholder={`Write your message to ${messageModal.customer.name}...`}
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setMessageModal({ open: false, customer: null })}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;