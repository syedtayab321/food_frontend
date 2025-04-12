// components/RecentOrders.jsx
import React from 'react';

const RecentOrders = ({ orders, onViewAll }) => {
  const recentOrders = orders || [
    { id: 1042, customer: "Alex Johnson", items: 3, total: 42.50, status: "Preparing" },
    { id: 1041, customer: "Sarah Miller", items: 2, total: 28.75, status: "Served" },
    { id: 1040, customer: "Michael Chen", items: 4, total: 56.20, status: "Completed" },
    { id: 1039, customer: "Emily Wilson", items: 1, total: 15.99, status: "Completed" },
    { id: 1038, customer: "David Kim", items: 5, total: 64.30, status: "Completed" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
        <button 
          className="text-red-600 hover:text-red-700 font-medium"
          onClick={onViewAll}
        >
          View All Orders
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Order #</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-red-50 transition">
                <td className="py-4 font-medium">#{order.id}</td>
                <td className="py-4">{order.customer}</td>
                <td className="py-4">{order.items} items</td>
                <td className="py-4">${order.total.toFixed(2)}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Completed" ? 'bg-green-100 text-green-800' :
                    order.status === "Served" ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;