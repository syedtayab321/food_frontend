import { FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import React, { useState } from 'react';

const ReportFilters = ({ filters, onFilterChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range Picker */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              {filters.dateRange.startDate.toLocaleDateString()} - {filters.dateRange.endDate.toLocaleDateString()}
            </span>
          </button>
          {showDatePicker && (
            <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg p-2">
              <DateRange
                ranges={[filters.dateRange]}
                onChange={(ranges) => {
                  onFilterChange({ dateRange: ranges.selection });
                  setShowDatePicker(false);
                }}
                moveRangeOnFirstSelection={false}
              />
            </div>
          )}
        </div>

        {/* Report Type Selector */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FaChartLine className="w-5 h-5" />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            value={filters.reportType}
            onChange={(e) => onFilterChange({ reportType: e.target.value })}
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
          </select>
        </div>

        {/* Category Filter */}
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="appetizers">Appetizers</option>
          <option value="main-course">Main Course</option>
          <option value="desserts">Desserts</option>
          <option value="beverages">Beverages</option>
        </select>
      </div>
    </div>
  );
};

export default ReportFilters;