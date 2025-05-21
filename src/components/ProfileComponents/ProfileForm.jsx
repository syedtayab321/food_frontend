import { FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';

const ProfileForm = ({ 
  profile, 
  isEditing, 
  onEditToggle, 
  onInputChange, 
  onSave, 
  onCancel 
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <div className="px-6 py-4 border-b flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">Business Information</h2>
      
      {!isEditing ? (
        <button 
          onClick={onEditToggle}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
        >
          <FaPencilAlt /> Edit Profile
        </button>
      ) : (
        <div className="flex gap-2">
          <button 
            onClick={onSave}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaCheck /> Save
          </button>
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      )}
    </div>

    <div className="p-6">
      {isEditing ? (
        <div className="space-y-4">
          <FormInput 
            label="Business Name"
            name="business_name"
            value={profile.business_name}
            onChange={onInputChange}
          />
          <FormInput 
            label="Phone Number"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={onInputChange}
          />
          <FormInput 
            label="Business Address"
            name="business_address"
            value={profile.business_address}
            onChange={onInputChange}
          />
          <FormInput 
            label="Operating Hours (e.g. 9:00 AM - 10:00 PM)"
            name="opening_closing_time"
            value={profile.opening_closing_time}
            onChange={onInputChange}
          />
          <FormTextArea 
            label="Business Description"
            name="business_description"
            value={profile.business_description}
            onChange={onInputChange}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <ProfileDetail label="Business Name" value={profile.business_name} />
          <ProfileDetail label="Phone Number" value={profile.phone} />
          <ProfileDetail label="Business Address" value={profile.business_address} />
          <ProfileDetail label="Operating Hours" value={profile.opening_closing_time} />
          <ProfileDetail label="Business Description" value={profile.business_description} />
          <ProfileDetail 
            label="Verification Status" 
            value={
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                profile.verification_status === 'verified' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {profile.verification_status}
              </span>
            } 
          />
          <ProfileDetail 
            label="Average Rating" 
            value={
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {profile.average_rating || 'Not rated yet'}
              </div>
            } 
          />
        </div>
      )}
    </div>
  </div>
);

const FormInput = ({ label, name, type = 'text', value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
    />
  </div>
);

const FormTextArea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
    ></textarea>
  </div>
);

const ProfileDetail = ({ label, value }) => (
  <div>
    <h3 className="text-gray-500 text-sm">{label}</h3>
    <div className="text-lg mt-1">{value || 'Not specified'}</div>
  </div>
);

export default ProfileForm;