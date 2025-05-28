const StatusBadge = ({ status, type }) => {
  const typeClasses = {
    payment: {
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800"
    },
    delivery: {
      PREPARING: "bg-blue-100 text-blue-800",
      ON_ROUTE: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800"
    }
  };

  const classes = typeClasses[type] || typeClasses.payment;
  const colorClass = classes.success || classes.default; // Simplified - adjust as needed

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;