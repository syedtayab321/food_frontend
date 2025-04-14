import { FaSearch, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import { useState } from 'react';

const ReservationFilters = ({ filters, onFilterChange, onNewReservation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FaSearch className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search reservations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          />
        </div>

        {/* Status Filter */}
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

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

        {/* New Reservation Button */}
        <button
          onClick={onNewReservation}
          className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <FaPlus className="mr-2" />
          New Reservation
        </button>
      </div>
    </div>
  );
};

export default ReservationFilters;