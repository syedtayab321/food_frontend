// components/StatsCards.jsx
import React from 'react';
import { FaUtensils, FaShoppingBasket, FaChartLine, FaStar } from 'react-icons/fa';

const StatsCards = ({ statsData }) => {
  const defaultStats = [
    { 
      title: "Today's Revenue", 
      value: "$1,842", 
      icon: FaChartLine, 
      change: "+12%", 
      trend: "up" 
    },
    { 
      title: "Active Orders", 
      value: "18", 
      icon: FaShoppingBasket, 
      change: "+5", 
      trend: "up" 
    },
    { 
      title: "Menu Items", 
      value: "87", 
      icon: FaUtensils, 
      change: "0", 
      trend: "neutral" 
    },
    { 
      title: "Customer Rating", 
      value: "4.8", 
      icon: FaStar, 
      change: "+0.1", 
      trend: "up" 
    },
  ];

  const stats = statsData || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon; // Capitalized variable for the component
        
        return (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 flex items-start">
            <div className="bg-red-50 p-3 rounded-lg mr-4">
              <IconComponent className="text-red-600 text-xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 
                  stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;