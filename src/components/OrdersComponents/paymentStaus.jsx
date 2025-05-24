import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import StatusBadge from "./OrderStatusBadge";

const PaymentStatus = ({ status, onUpdate, mobile = false }) => {
  const [loading, setLoading] = useState(false);

  const statusMap = {
    'C': { display: 'Paid', type: 'success' },
    'P': { display: 'Pending', type: 'warning' },
    'F': { display: 'Failed', type: 'error' }
  };

  const currentStatus = statusMap[status] || { display: 'Unknown', type: 'default' };

  const handleMarkAsPaid = async () => {
    setLoading(true);
    try {
      await onUpdate({ payment_status: 'C' });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'C' || status === 'F') {
    return <StatusBadge status={currentStatus.display} type="payment" />;
  }

  return (
    <div className={`flex ${mobile ? "flex-col" : "flex-row items-center"} gap-1`}>
      <StatusBadge status={currentStatus.display} type="payment" />
      <button
        onClick={handleMarkAsPaid}
        disabled={loading}
        className={`flex items-center justify-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors ${mobile ? "h-6" : "h-7"}`}
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            <FaCheck className="mr-1 text-xs" />
            Mark Paid
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentStatus;