import { FaSearch, FaFilter } from 'react-icons/fa';

const StaffFilters = ({ filters, onFilterChange }) => {
  const roles = ['all', 'manager', 'chef', 'waiter', 'delivery'];
  const statuses = ['all', 'active', 'on-leave', 'inactive'];

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
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          />
        </div>

        {/* Role Filter */}
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          value={filters.role}
          onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        <button
          onClick={() => onFilterChange({
            role: 'all',
            status: 'active',
            searchQuery: ''
          })}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          <FaFilter className="mr-2" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default StaffFilters;