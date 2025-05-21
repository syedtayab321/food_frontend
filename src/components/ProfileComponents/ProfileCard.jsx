import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera, FaStar, FaMapMarkerAlt, FaClock, FaShieldAlt } from 'react-icons/fa';

const ProfileCard = ({ profile, profileImage, onImageChange, onPasswordToggle, }) => (
  <div className="lg:col-span-1">
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 h-24"></div>
      
      <div className="px-6 pb-6">
        <div className="flex justify-center -mt-16 mb-4">
          <div className="relative group">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md transition group-hover:opacity-90"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <FaCamera className="text-white text-2xl" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{profile.business_name}</h2>
          <p className="text-red-600 font-medium">{profile.verification_status === 'verified' ? 'Verified Business' : 'Unverified Business'}</p>
          <p className="text-gray-500 text-sm mt-2">Member since {new Date(profile.created_at).toLocaleDateString()}</p>
        </div>

        <div className="space-y-4">
          <ProfileInfoItem 
            icon={<FaStar className="text-red-600" />}
            label="Average Rating"
            value={profile.average_rating || 'Not rated yet'}
          />
          <ProfileInfoItem 
            icon={<FaMapMarkerAlt className="text-red-600" />}
            label="Business Address"
            value={profile.business_address}
          />
          <ProfileInfoItem 
            icon={<FaClock className="text-red-600" />}
            label="Operating Hours"
            value={profile.opening_closing_time}
          />
          <ProfileInfoItem 
            icon={<FaShieldAlt className="text-red-600" />}
            label="Verification Status"
            value={profile.verification_status}
          />
        </div>

        <button 
          onClick={onPasswordToggle}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition shadow hover:shadow-md"
        >
          <FaLock /> Change Password
        </button>
      </div>
    </div>
  </div>
);

const ProfileInfoItem = ({ icon, label, value }) => (
  <div className="flex items-start p-3 rounded-lg hover:bg-red-50 transition">
    <div className="bg-red-100 p-2 rounded-full mr-3">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium break-words">{value || 'Not specified'}</p>
    </div>
  </div>
);

export default ProfileCard;