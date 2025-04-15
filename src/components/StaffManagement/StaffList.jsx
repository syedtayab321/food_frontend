import { FaUser, FaPhone, FaEnvelope, FaEdit } from 'react-icons/fa';

const StaffList = ({ staffMembers, onEdit }) => {
  const getRoleBadge = (role) => {
    const roleClasses = {
      manager: 'bg-purple-100 text-purple-800',
      chef: 'bg-red-100 text-red-800',
      waiter: 'bg-blue-100 text-blue-800',
      delivery: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleClasses[role] || 'bg-gray-100 text-gray-800'}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      'on-leave': 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staffMembers.map((staff) => (
            <tr key={staff.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <FaUser className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                    <div className="text-sm text-gray-500">Joined: {new Date(staff.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  {staff.email}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaPhone className="mr-2 text-gray-400" />
                  {staff.contact}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(staff.role)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(staff.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(staff)}
                  className="text-red-600 hover:text-red-900 flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;