import { FaCheck, FaTimes, FaMotorcycle } from "react-icons/fa";

const OrderActions = ({ status, onUpdate, orderId }) => {
  return (
    <div className="flex gap-2">
      {status === "Preparing" && (
        <button 
          onClick={() => onUpdate(orderId, "Ready")}
          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          title="Mark as Ready"
        >
          <FaCheck size={14} />
        </button>
      )}
      {status === "Ready" && (
        <button 
          onClick={() => onUpdate(orderId, "Delivered")}
          className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
          title="Mark as Delivered"
        >
          <FaMotorcycle size={14} />
        </button>
      )}
      {(status === "Preparing" || status === "Ready") && (
        <button 
          onClick={() => onUpdate(orderId, "Cancelled")}
          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          title="Cancel Order"
        >
          <FaTimes size={14} />
        </button>
      )}
    </div>
  );
};

export default OrderActions;