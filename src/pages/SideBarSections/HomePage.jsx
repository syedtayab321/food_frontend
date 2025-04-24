// HomePage.jsx
import React from 'react';
import Header from './../../components/HomeComponents/Header';
import StatsCards from './../../components/HomeComponents/StatsCard';
import SalesChart from './../../components/HomeComponents/SalesChart';
import PopularItemsChart from './../../components/HomeComponents/PopularItemsChart';
import RecentOrders from './../../components/HomeComponents/RecentOrders';
import MenuCategories from './../../components/HomeComponents/MenuCategories';

const HomePage = () => {
  const dashboardData = {
    stats: [
      { title: "Today's Revenue", value: "$1,842", icon: 'FaChartLine', change: "+12%", trend: "up" },
      { title: "Active Orders", value: "18", icon: 'FaShoppingBasket', change: "+5", trend: "up" },
      { title: "Menu Items", value: "87", icon: 'FaUtensils', change: "0", trend: "neutral" },
      { title: "Customer Rating", value: "4.8", icon: 'FaStar', change: "+0.1", trend: "up" },
    ],
    salesData: [
      { name: 'Mon', sales: 12 },
      { name: 'Tue', sales: 19 },
      { name: 'Wed', sales: 15 },
      { name: 'Thu', sales: 28 },
      { name: 'Fri', sales: 32 },
      { name: 'Sat', sales: 45 },
      { name: 'Sun', sales: 38 },
    ],
    popularItems: [
      { name: 'Margherita Pizza', value: 65 },
      { name: 'Pasta Carbonara', value: 45 },
      { name: 'Grilled Salmon', value: 30 },
      { name: 'Caesar Salad', value: 25 },
      { name: 'Tiramisu', value: 20 },
    ],
    recentOrders: [
      { id: 1042, customer: "Alex Johnson", items: 3, total: 42.50, status: "Preparing" },
      { id: 1041, customer: "Sarah Miller", items: 2, total: 28.75, status: "Served" },
      { id: 1040, customer: "Michael Chen", items: 4, total: 56.20, status: "Completed" },
      { id: 1039, customer: "Emily Wilson", items: 1, total: 15.99, status: "Completed" },
      { id: 1038, customer: "David Kim", items: 5, total: 64.30, status: "Completed" },
    ],
    menuCategories: ['Appetizers', 'Main Courses', 'Desserts']
  };

  const handleViewAllOrders = () => {
    // Navigate to orders page or show more orders
    console.log('View all orders clicked');
  };

  const handleCategoryClick = (category) => {
    // Navigate to menu page with category filter
    console.log('Category clicked:', category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="WadiConnect Dashboard" userName="Manager" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Restaurant Overview</h2>
          <p className="opacity-90">Real-time performance metrics and analytics</p>
        </div>

        {/* <StatsCards statsData={dashboardData.stats} /> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SalesChart data={dashboardData.salesData} />
          <PopularItemsChart data={dashboardData.popularItems} />
        </div>

        <RecentOrders 
          orders={dashboardData.recentOrders} 
          onViewAll={handleViewAllOrders} 
        />

        <MenuCategories 
          categories={dashboardData.menuCategories} 
          onCategoryClick={handleCategoryClick} 
        />
      </main>
    </div>
  );
};

export default HomePage;