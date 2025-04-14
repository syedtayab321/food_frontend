import React, { useState } from 'react';
import ReservationsList from '../../components/Reservations/ReservationsList';
import ReservationFilters from '../../components/Reservations/ReservationFilters';
import ReservationModal from '../../components/Reservations/ReservationModal'

const Reservations = () => {
  // State management
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    status: 'all',
    searchQuery: ''
  });
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reservations (to be replaced with API call)
  const fetchReservations = async () => {
    // API integration will go here
    const mockData = []; // Your mock data
    setReservations(mockData);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle reservation selection
  const handleSelectReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-sm w-full p-6 md:p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Reservation Management</h1>
        
        {/* Filters Component */}
        <ReservationFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onNewReservation={() => setIsModalOpen(true)}
        />
        
        {/* List Component */}
        <ReservationsList 
          reservations={reservations}
          filters={filters}
          onSelectReservation={handleSelectReservation}
        />
        
        {/* Modal Component */}
        {isModalOpen && (
          <ReservationModal
            reservation={selectedReservation}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedReservation(null);
            }}
            onSave={(updatedReservation) => {
              // Handle save logic
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Reservations;