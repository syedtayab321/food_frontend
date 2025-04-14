import React, { useState } from 'react';
import ProfileHeader from './../../components/ProfileComponents/ProfileHeader';
import ProfileCard from './../../components/ProfileComponents/ProfileCard';
import ProfileForm from './../../components/ProfileComponents/ProfileForm';
import PasswordForm from './../../components/ProfileComponents/PasswordForm';

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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    // API call would go here
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader 
          title="Profile Management" 
          subtitle="Update your personal and professional information" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <ProfileCard 
            profile={profile}
            profileImage={profileImage}
            onImageChange={(file) => {
              const reader = new FileReader();
              reader.onloadend = () => setProfileImage(reader.result);
              reader.readAsDataURL(file);
            }}
            onPasswordToggle={() => setShowPasswordForm(!showPasswordForm)}
          />

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileForm 
              profile={isEditing ? tempProfile : profile}
              isEditing={isEditing}
              onEditToggle={() => setIsEditing(!isEditing)}
              onInputChange={(e) => {
                const { name, value } = e.target;
                setTempProfile({ ...tempProfile, [name]: value });
              }}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            {showPasswordForm && (
              <PasswordForm 
                onClose={() => setShowPasswordForm(false)}
                onSubmit={(passwords) => {
                  console.log('Password change:', passwords);
                  setShowPasswordForm(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;