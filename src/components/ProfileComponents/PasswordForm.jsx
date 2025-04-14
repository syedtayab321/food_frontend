import { useState } from 'react';
import { FaLock, FaTimes } from 'react-icons/fa';

const PasswordForm = ({ onClose, onSubmit }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-red-600 transition"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <PasswordInput 
          label="Current Password"
          name="current"
          value={passwords.current}
          onChange={handleChange}
        />
        <PasswordInput 
          label="New Password"
          name="new"
          value={passwords.new}
          onChange={handleChange}
        />
        <PasswordInput 
          label="Confirm New Password"
          name="confirm"
          value={passwords.confirm}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSubmit(passwords)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <FaLock /> Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
    />
  </div>
);

export default PasswordForm;