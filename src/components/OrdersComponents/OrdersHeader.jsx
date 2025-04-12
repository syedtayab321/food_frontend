import { FiRefreshCw } from "react-icons/fi";
import { FaPrint } from "react-icons/fa";

const OrdersHeader = ({ title, description, onRefresh, isRefreshing }) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-red-600">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onRefresh}
          className={`p-2 bg-white rounded-lg border hover:bg-gray-50 ${isRefreshing ? "animate-spin" : ""}`}
        >
          <FiRefreshCw />
        </button>
        <button className="p-2 bg-white rounded-lg border hover:bg-gray-50">
          <FaPrint />
        </button>
      </div>
    </div>
  );
};

export default OrdersHeader;