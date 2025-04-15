import React, { useState, useEffect } from 'react';
import StaffFilters from './../../components/StaffManagement/StaffFilters';
import StaffList from './../../components/StaffManagement/StaffList';
import StaffModal from './../../components/StaffManagement/StaffModal';
import { FaUserPlus } from 'react-icons/fa';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'active',
    searchQuery: ''
  });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        // Simulated API response
        const mockData = [
          {
            id: 1,
            name: 'John Smith',
            email: 'john@restaurant.com',
            role: 'manager',
            status: 'active',
            joinDate: '2022-03-15',
            lastActive: '2023-06-20',
            contact: '+1234567890'
          },
          // ... more staff members
        ];
        setStaffMembers(mockData);
        setFilteredStaff(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Apply filters
  useEffect(() => {
    let results = staffMembers;
    
    if (filters.role !== 'all') {
      results = results.filter(staff => staff.role === filters.role);
    }
    
    if (filters.status !== 'all') {
      results = results.filter(staff => staff.status === filters.status);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(staff =>
        staff.name.toLowerCase().includes(query) ||
        staff.email.toLowerCase().includes(query)
  )}
    
    setFilteredStaff(results);
  }, [filters, staffMembers]);

  const handleSaveStaff = (staffData) => {
    if (staffData.id) {
      // Update existing staff
      setStaffMembers(prev => 
        prev.map(staff => staff.id === staffData.id ? staffData : staff)
      );
    } else {
      // Add new staff
      const newStaff = { ...staffData, id: staffMembers.length + 1 };
      setStaffMembers(prev => [...prev, newStaff]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-sm w-full p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-red-600">Staff Management</h1>
          <button
            onClick={() => {
              setSelectedStaff(null);
              setIsModalOpen(true);
            }}
            className="flex items-center mt-4 md:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <FaUserPlus className="mr-2" />
            Add Staff Member
          </button>
        </div>

        <StaffFilters 
          filters={filters}
          onFilterChange={setFilters}
        />

        {loading ? (
          <div className="text-center py-8">Loading staff data...</div>
        ) : (
          <StaffList 
            staffMembers={filteredStaff}
            onEdit={(staff) => {
              setSelectedStaff(staff);
              setIsModalOpen(true);
            }}
          />
        )}

        {isModalOpen && (
          <StaffModal
            staff={selectedStaff}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveStaff}
          />
        )}
      </div>
    </div>
  );
};

export default StaffManagement;