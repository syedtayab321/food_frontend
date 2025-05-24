import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const OrdersFilter = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter,
  deliveryStatusFilter,
  onStatusFilterChange,
  onDeliveryStatusFilterChange,
  onClearFilters,
  orders = []
}) => {
  // Payment status options
  const paymentStatuses = [
    { value: 'all', label: 'All Payment Statuses' },
    { value: 'paid', label: 'Paid (Completed)', backendValue: 'C' },
    { value: 'pending', label: 'Pending', backendValue: 'P' },
    { value: 'failed', label: 'Failed', backendValue: 'F' }
  ];

  // Get unique delivery statuses from orders
  const deliveryStatuses = ['all', ...new Set(orders.map(order => 
    order.delivery_status ? order.delivery_status.toLowerCase() : 'unknown'
  ).filter(Boolean))];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
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
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FaTimes className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          )}
        </div>

        {/* Payment Status Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter className="h-5 w-5 text-red-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="appearance-none pl-10 pr-8 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
          >
            {paymentStatuses.map(({ value, label }) => (
              <option 
                key={`payment-${value}`} 
                value={value}
                className={
                  value === 'paid' ? 'text-green-600' : 
                  value === 'pending' ? 'text-yellow-600' : 
                  value === 'failed' ? 'text-red-600' : ''
                }
              >
                {label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Delivery Status Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter className="h-5 w-5 text-red-400" />
          </div>
          <select
            value={deliveryStatusFilter}
            onChange={(e) => onDeliveryStatusFilterChange(e.target.value)}
            className="appearance-none pl-10 pr-8 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
          >
            {deliveryStatuses.map(status => (
              <option 
                key={`delivery-${status}`} 
                value={status}
                className={
                  status === 'delivered' ? 'text-green-600' : 
                  status === 'preparing' ? 'text-yellow-600' : 
                  status === 'cancelled' ? 'text-red-600' : ''
                }
              >
                {status === 'all' ? 'All Delivery Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || statusFilter !== 'all' || deliveryStatusFilter !== 'all') && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200"
          >
            <FaTimes className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Active Filters Indicator */}
      {(searchQuery || statusFilter !== 'all' || deliveryStatusFilter !== 'all') && (
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
              Payment: {paymentStatuses.find(s => s.value === statusFilter)?.label.split(' (')[0]}
              <button 
                onClick={() => onStatusFilterChange('all')}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-400 hover:bg-red-200 hover:text-red-600"
              >
                <FaTimes className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {deliveryStatusFilter !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Delivery: {deliveryStatusFilter.charAt(0).toUpperCase() + deliveryStatusFilter.slice(1)}
              <button 
                onClick={() => onDeliveryStatusFilterChange('all')}
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