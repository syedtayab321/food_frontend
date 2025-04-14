import { FiRefreshCw } from 'react-icons/fi';

const CustomerHeader = ({ title, subtitle, onRefresh, isRefreshing }) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">{title}</h1>
        <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
      </div>
      
      <button 
        onClick={onRefresh}
        className={`p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${
          isRefreshing ? 'animate-spin' : ''
        }`}
        aria-label="Refresh"
      >
        <FiRefreshCw className="text-gray-600" />
      </button>
    </div>
  );
};

export default CustomerHeader;