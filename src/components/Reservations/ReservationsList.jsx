import { FaUser, FaClock, FaChair } from 'react-icons/fa';
import StatusBadge from './StatusBadge';

const ReservationsList = ({ reservations, filters, onSelectReservation }) => {
  // Filter reservations based on filters
  const filteredReservations = reservations.filter(res => {
    // Apply your filter logic here
    return true;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredReservations.map(reservation => (
            <tr key={reservation.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <FaUser className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{reservation.customer_name}</div>
                    <div className="text-sm text-gray-500">{reservation.contact}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(reservation.reservation_date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaClock className="mr-1 text-gray-400" />
                  {reservation.reservation_time}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 flex items-center">
                  <FaChair className="mr-2 text-gray-400" />
                  {reservation.party_size} people
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={reservation.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => onSelectReservation(reservation)}
                  className="text-red-600 hover:text-red-900 mr-3"
                >
                  Edit
                </button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;