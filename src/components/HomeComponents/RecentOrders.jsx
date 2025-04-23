import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorOrders } from "../../Services/Orders/ordersSlice";

// Helper to format technical errors to user-friendly messages
const formatError = (error) => {
  if (!error) return null;
  if (error.includes("Authentication credentials were not provided")) {
    return "Please log in to view your orders.";
  }
  if (error.includes("Network Error")) {
    return "Network issue: please check your internet connection.";
  }
  return "Something went wrong. Please try again.";
};

const RecentOrders = ({ onViewAll }) => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchVendorOrders());
  }, [dispatch]);

  // Show the most recent 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

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

      {loading ? (
        <div className="text-gray-500 py-8 text-center">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500 py-8 text-center">{formatError(error)}</div>
      ) : (
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
                  <td className="py-4">${parseFloat(order.total).toFixed(2)}</td>
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
      )}
    </div>
  );
};

export default RecentOrders;
