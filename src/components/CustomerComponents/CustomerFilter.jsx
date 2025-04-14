import { FaSearch, FaFilter } from 'react-icons/fa';

const CustomerFilter = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          >
            <option value="all">All Customers</option>
            <option value="favorites">Favorites</option>
            <option value="frequent">Frequent (10+ orders)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomerFilter;