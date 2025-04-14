import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const OrdersFilter = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  onClearFilters
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input with Enhanced Styling */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-red-400" />
          </div>
          <input
            type="text"
            placeholder="Search by order ID, customer name..."
            className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('')
                onClearFilters?.()
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FaTimes className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          )}
        </div>

        {/* Status Filter with Enhanced Styling */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-5 w-5 text-red-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="appearance-none pl-10 pr-8 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            >
              <option value="all">All Statuses</option>
              <option value="Preparing" className="text-yellow-600">Preparing</option>
              <option value="Ready" className="text-green-600">Ready</option>
              <option value="Delivered" className="text-blue-600">Delivered</option>
              <option value="Cancelled" className="text-red-600">Cancelled</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || statusFilter !== 'all') && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200"
            >
              <FaTimes className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Indicator */}
      {(searchQuery || statusFilter !== 'all') && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Search: "{searchQuery}"
              <button 
                onClick={() => onSearchChange('')}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-400 hover:bg-red-200 hover:text-red-600"
              >
                <FaTimes className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Status: {statusFilter}
              <button 
                onClick={() => onStatusFilterChange('all')}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-400 hover:bg-red-200 hover:text-red-600"
              >
                <FaTimes className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersFilter;