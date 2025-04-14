import { useState } from 'react'
import ReservationList from './../../components/ReservationComponents/ReservationList'
import ReservationFilter from './../../components/ReservationComponents/ReservationFilters';
import ReservationModal from './../../components/ReservationComponents/ReservationModal';
const Reservations = () => {
  const [filters, setFilters] = useState({
    date: '',
    status: 'all',
    search: ''
  })
  const [selectedReservation, setSelectedReservation] = useState(null)

  // Sample data - replace with your API calls
  const reservations = [
    {
      id: 1,
      customerName: 'John Doe',
      date: '2023-06-15',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      contact: 'john@example.com',
      phone: '+1234567890',
      specialRequests: 'Window seat preferred'
    },
    // More reservations...
  ]

  const filteredReservations = reservations.filter(res => {
    return (
      (filters.date === '' || res.date === filters.date) &&
      (filters.status === 'all' || res.status === filters.status) &&
      (filters.search === '' || 
        (res.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        res.contact.toLowerCase().includes(filters.search.toLowerCase())))
  )})

  const handleStatusChange = async (id, newStatus) => {
    // API call to update status would go here
    console.log(`Updating reservation ${id} to ${newStatus}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reservation Management</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <ReservationFilter 
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <ReservationList 
        reservations={filteredReservations}
        onSelect={setSelectedReservation}
        onStatusChange={handleStatusChange}
      />

      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}

export default Reservations