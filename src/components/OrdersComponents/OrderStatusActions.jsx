
import { FaCheck, FaTimes, FaMotorcycle, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import StatusBadge from "./OrderStatusBadge";

const OrderStatusActions = ({ 
  orderId, 
  paymentStatus, 
  deliveryStatus, 
  onUpdate, 
  mobile = false 
}) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Payment status mapping
  const paymentStatusMap = {
    'C': { display: 'Paid', type: 'success' },
    'P': { display: 'UnPaid', type: 'warning' },
    'F': { display: 'Failed', type: 'error' }
  };

  const currentPaymentStatus = paymentStatusMap[paymentStatus] || { display: 'Unknown', type: 'default' };

  const handleMarkAsPaid = async () => {
    setPaymentLoading(true);
    try {
      await onUpdate(orderId, { payment_status: 'C' });
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleDeliveryAction = (deliveryStatus) => {
    onUpdate(orderId, { delivery_status: deliveryStatus });
    setShowDropdown(false);
  };

  return (
    <div className={`flex ${mobile ? "flex-col" : "flex-row items-center"} gap-1`}>
      {/* Payment Status */}
      {paymentStatus !== 'C' && paymentStatus !== 'F' ? (
        <div className={`flex  ${mobile ? "flex-col" : "flex-col items-center"} gap-1`}>
          <StatusBadge status={currentPaymentStatus.display} type="payment" />
          <button
            onClick={handleMarkAsPaid}
            disabled={paymentLoading}
            className={`flex items-center justify-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors  ${mobile ? "h-6" : "h-7"}`}
          >
            {paymentLoading ? (
              "Processing..."
            ) : (
              <>
                <FaCheck className="mr-1 text-xs" />
                Mark Paid
              </>
            )}
          </button>
        </div>
      ) : (
        <StatusBadge status={currentPaymentStatus.display} type="payment" />
      )}

      

      {/* Delivery Actions */}
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
            {deliveryStatus === "PREPARING" && (
              <button
                onClick={() => handleDeliveryAction("ON_ROUTE")}
                className="flex items-center w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
              >
                <FaCheck className="mr-2" />
                Mark as Ready
              </button>
            )}
            {deliveryStatus === "ON_ROUTE" && (
              <button
                onClick={() => handleDeliveryAction("DELIVERED")}
                className="flex items-center w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50"
              >
                <FaMotorcycle className="mr-2" />
                Mark as Delivered
              </button>
            )}
            {(deliveryStatus === "PREPARING" || deliveryStatus === "ON_ROUTE") && (
              <button
                onClick={() => handleDeliveryAction("CANCELLED")}
                className="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <FaTimes className="mr-2" />
                Cancel Order
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusActions;