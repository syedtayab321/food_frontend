// src/components/ProfileComponents/ProfileForm.js
import { FaPencilAlt, FaCheck, FaTimes, FaUtensils, FaPhone, FaMapMarkedAlt, FaClock, FaAlignLeft } from 'react-icons/fa';

const ProfileForm = ({ 
  profile, 
  isEditing, 
  onEditToggle, 
  onInputChange, 
  onSave, 
  onCancel 
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
      <h2 className="text-xl font-bold text-gray-800">Restaurant Information</h2>
      
      {!isEditing ? (
        <button 
          onClick={onEditToggle}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition duration-300"
        >
          <FaPencilAlt /> Edit Profile
        </button>
      ) : (
        <div className="flex gap-2">
          <button 
            onClick={onSave}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            <FaCheck /> Save
          </button>
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      )}
    </div>

    <div className="p-6">
      {isEditing ? (
        <div className="space-y-5">
          <FormInput 
            label="Restaurant Name"
            name="business_name"
            value={profile.business_name}
            onChange={onInputChange}
            icon={<FaUtensils className="text-gray-400" />}
          />
          <FormInput 
            label="Phone Number"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={onInputChange}
            icon={<FaPhone className="text-gray-400" />}
          />
          <FormInput 
            label="Restaurant Address"
            name="business_address"
            value={profile.business_address}
            onChange={onInputChange}
            icon={<FaMapMarkedAlt className="text-gray-400" />}
          />
          <FormInput 
            label="Operating Hours (e.g. 9:00 AM - 10:00 PM)"
            name="opening_closing_time"
            value={profile.opening_closing_time}
            onChange={onInputChange}
            icon={<FaClock className="text-gray-400" />}
          />
          <FormInput 
            label="Cuisine Type"
            name="cuisine_type"
            value={profile.cuisine_type}
            onChange={onInputChange}
            icon={<FaUtensils className="text-gray-400" />}
          />
          <FormInput 
            label="Seating Capacity"
            name="seating_capacity"
            value={profile.seating_capacity}
            onChange={onInputChange}
            icon={<FaUtensils className="text-gray-400" />}
          />
          <FormTextArea 
            label="Restaurant Description"
            name="business_description"
            value={profile.business_description}
            onChange={onInputChange}
            icon={<FaAlignLeft className="text-gray-400" />}
          />
        </div>
      ) : (
        <div className="space-y-5">
          <ProfileDetail label="Restaurant Name" value={profile.business_name} />
          <ProfileDetail label="Phone Number" value={profile.phone} />
          <ProfileDetail label="Restaurant Address" value={profile.business_address} />
          <ProfileDetail label="Operating Hours" value={profile.opening_closing_time} />
          <ProfileDetail label="Cuisine Type" value={profile.cuisine_type} />
          <ProfileDetail label="Seating Capacity" value={profile.seating_capacity} />
          <ProfileDetail 
            label="Description" 
            value={profile.business_description || 'No description provided'} 
          />
        </div>
      )}
    </div>
  </div>
);

const FormInput = ({ label, name, type = 'text', value, onChange, icon }) => (
  <div>
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
      />
    </div>
  </div>
);

const FormTextArea = ({ label, name, value, onChange, icon }) => (
  <div>
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <div className="relative">
      <div className="absolute top-3 left-3">
        {icon}
      </div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
      ></textarea>
    </div>
  </div>
);

const ProfileDetail = ({ label, value }) => (
  <div className="border-b pb-4 last:border-b-0">
    <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
    <div className="text-lg mt-1 text-gray-800">{value}</div>
  </div>
);

export default ProfileForm;