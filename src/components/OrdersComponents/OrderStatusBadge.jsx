const StatusBadge = ({ status }) => {
    const statusStyles = {
      Preparing: "bg-yellow-100 text-yellow-800",
      Ready: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
  
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };
  
  export default StatusBadge;