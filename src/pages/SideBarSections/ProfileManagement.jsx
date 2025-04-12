import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera, FaCheck, FaTimes, FaPencilAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Chef Gordon',
    email: 'gordon@savorysync.com',
    phone: '+1 (555) 123-4567',
    role: 'Head Chef',
    joinDate: 'January 15, 2020',
    bio: 'Passionate about creating culinary masterpieces and training kitchen staff.'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    // Add API call here to update profile
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-600">Profile Management</h1>
          <p className="text-gray-600">Update your personal and professional information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative bg-red-600 h-24"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                    />
                    <label className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition">
                      <FaCamera />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-red-600">{profile.role}</p>
                  <p className="text-gray-500 text-sm mt-2">Member since {profile.joinDate}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <FaUser className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Full Name</p>
                      <p className="font-medium">{profile.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <FaEnvelope className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <FaPhone className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FaLock /> Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <FaPencilAlt /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      <FaCheck /> Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={tempProfile.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={tempProfile.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={tempProfile.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={tempProfile.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      ></textarea>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Full Name</h3>
                      <p className="text-lg">{profile.name}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-500 text-sm">Email</h3>
                      <p className="text-lg">{profile.email}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-500 text-sm">Phone Number</h3>
                      <p className="text-lg">{profile.phone}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-500 text-sm">Bio</h3>
                      <p className="text-lg">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Password Change Form */}
            {showPasswordForm && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      onClick={() => setShowPasswordForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;