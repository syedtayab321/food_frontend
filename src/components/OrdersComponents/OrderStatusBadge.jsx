const StatusBadge = ({ status, type = 'delivery' }) => {
  const statusStyles = {
    delivery: {
      Preparing: "bg-yellow-100 text-yellow-800",
      Ready: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    },
    payment: {
      Completed: "bg-green-100 text-green-800",
      Pending: "bg-orange-100 text-orange-800",
      Failed: "bg-red-100 text-red-800",
      Unknown: "bg-gray-100 text-gray-800"
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[type][status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;