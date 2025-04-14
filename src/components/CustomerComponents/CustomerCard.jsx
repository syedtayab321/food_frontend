import { FaEnvelope, FaPhone, FaUser, FaRegStar, FaStar } from 'react-icons/fa';

const CustomerCard = ({ customer, onToggleFavorite, onMessageClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={customer.photo} 
              alt={customer.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-red-100"
            />
            <div>
              <h3 className="font-bold text-gray-800">{customer.name}</h3>
              <p className="text-gray-500 text-sm">{customer.orders} orders</p>
            </div>
          </div>
          <button 
            onClick={() => onToggleFavorite(customer.id)}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
            aria-label={customer.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {customer.isFavorite ? (
              <FaStar className="text-yellow-400 text-lg" />
            ) : (
              <FaRegStar className="text-lg" />
            )}
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaEnvelope className="text-red-500 flex-shrink-0" />
            <span className="truncate text-sm">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaPhone className="text-red-500 flex-shrink-0" />
            <span className="text-sm">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaUser className="text-red-500 flex-shrink-0" />
            <span className="text-sm">Last order: {new Date(customer.lastOrder).toLocaleDateString()}</span>
          </div>
        </div>

        <button
          onClick={() => onMessageClick(customer)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white py-2 rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-sm"
        >
          <FaEnvelope /> Message
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;