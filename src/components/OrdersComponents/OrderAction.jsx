import { FaCheck, FaTimes, FaMotorcycle, FaEllipsisV } from "react-icons/fa";
import { useState } from "react"; 

const OrderActions = ({ status, onUpdate, orderId }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAction = (deliveryStatus) => {
    onUpdate({ delivery_status: deliveryStatus });
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        aria-label="Order actions"
      >
        <FaEllipsisV className="text-sm" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
          {status === "PREPARING" && (
            <button
              onClick={() => handleAction("ON_ROUTE")}
              className="flex items-center w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
            >
              <FaCheck className="mr-2" />
              Mark as Ready
            </button>
          )}
          {status === "ON_ROUTE" && (
            <button
              onClick={() => handleAction("DELIVERED")}
              className="flex items-center w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50"
            >
              <FaMotorcycle className="mr-2" />
              Mark as Delivered
            </button>
          )}
          {(status === "PREPARING" || status === "ON_ROUTE") && (
            <button
              onClick={() => handleAction("CANCELLED")}
              className="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <FaTimes className="mr-2" />
              Cancel Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderActions;