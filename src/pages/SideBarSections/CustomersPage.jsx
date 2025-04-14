import { useState } from 'react';
import CustomerHeader from './../../components/CustomerComponents/CustomerHeader';
import CustomerFilter from './../../components/CustomerComponents/CustomerFilter';
import CustomerList from './../../components/CustomerComponents/CustomerList';
import MessageModal from './../../Models/Common/MessageModal';

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
      <CustomerHeader 
        title="Customers" 
        subtitle="Manage and communicate with your customers"
        onRefresh={refreshCustomers}
        isRefreshing={isRefreshing}
      />
      
      <CustomerFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
      />

      <CustomerList 
        customers={filteredCustomers}
        onToggleFavorite={toggleFavorite}
        onMessageClick={(customer) => setMessageModal({ open: true, customer })}
      />

      <MessageModal
        isOpen={messageModal.open}
        customer={messageModal.customer}
        messageText={messageText}
        onClose={() => setMessageModal({ open: false, customer: null })}
        onMessageChange={(e) => setMessageText(e.target.value)}
        onSend={sendMessage}
      />
    </div>
  );
};

export default CustomersPage;