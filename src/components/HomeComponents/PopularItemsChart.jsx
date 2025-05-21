// components/PopularItemsChart.jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6'];

const PopularItemsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('https://xavics.pythonanywhere.com/store/products/seller-products/', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        
        // Transform products data for the chart
        const transformedData = products
          .filter(product => product.inventory > 0) // Only include products with inventory
          .sort((a, b) => b.inventory - a.inventory) // Sort by inventory (descending)
          .slice(0, 5) // Take top 5 products
          .map(product => ({
            name: product.title,
            value: product.inventory,
            unitPrice: product.unit_price,
            category: product.category_name
          }));

        setChartData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Most Popular Menu Items</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Most Popular Menu Items</h3>
        <div className="h-64 flex items-center justify-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Most Popular Menu Items</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No inventory data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Most Popular Menu Items</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                `${value} units`,
                `Price: $${props.payload.unitPrice}`,
                `Category: ${props.payload.category}`
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopularItemsChart;