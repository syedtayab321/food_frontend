import StatusBadge from './StatusBadge'
import { format } from 'date-fns'

const ReservationItem = ({ reservation, onSelect, onStatusChange, isLast }) => {
  const handleStatusChange = (e) => {
    onStatusChange(reservation.id, e.target.value)
  }

  return (
    <div 
      className={`grid grid-cols-12 p-4 hover:bg-red-50 cursor-pointer transition-colors duration-150 ${!isLast ? 'border-b border-gray-100' : ''}`}
      onClick={() => onSelect(reservation)}
    >
      <div className="col-span-3 font-medium text-gray-800 flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
        {reservation.customerName}
      </div>
      <div className="col-span-2 text-gray-600">
        <div className="font-medium">{format(new Date(reservation.date), 'MMM d, yyyy')}</div>
        <div className="text-sm text-gray-500">{reservation.time}</div>
      </div>
      <div className="col-span-1 text-gray-600">
        {reservation.guests}
      </div>
      <div className="col-span-2 text-sm text-gray-600">
        <div className="truncate">{reservation.contact}</div>
        <div className="text-gray-500">{reservation.phone}</div>
      </div>
      <div className="col-span-2">
        <StatusBadge status={reservation.status} />
      </div>
      <div className="col-span-2 flex items-center space-x-2">
        <button 
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(reservation)
          }}
        >
          View
        </button>
        <select
          value={reservation.status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-black px-4 py-2 rounded-lg transition"
         >
          <option value="confirmed">Confirm</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancel</option>
          <option value="completed">Complete</option>
        </select>
      </div>
    </div>
  )
}

export default ReservationItem