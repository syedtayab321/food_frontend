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
      <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
      
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
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={onInputChange}
          />
          <FormInput 
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={onInputChange}
          />
          <FormInput 
            label="Phone Number"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={onInputChange}
          />
          <FormTextArea 
            label="Bio"
            name="bio"
            value={profile.bio}
            onChange={onInputChange}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <ProfileDetail label="Full Name" value={profile.name} />
          <ProfileDetail label="Email" value={profile.email} />
          <ProfileDetail label="Phone Number" value={profile.phone} />
          <ProfileDetail label="Bio" value={profile.bio} />
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
    <p className="text-lg mt-1">{value || 'Not specified'}</p>
  </div>
);

export default ProfileForm;