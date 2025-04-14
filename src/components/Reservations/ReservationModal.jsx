import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
const ReservationModal = ({ reservation, onClose, onSave }) => {
  const [formData, setFormData] = useState(reservation || {
    customer_name: '',
    contact: '',
    reservation_date: new Date(),
    reservation_time: '',
    party_size: 2,
    status: 'pending',
    special_requests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">
            {reservation ? 'Edit Reservation' : 'New Reservation'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form fields go here */}
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => onSave(formData)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                >
                  Save Reservation
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;