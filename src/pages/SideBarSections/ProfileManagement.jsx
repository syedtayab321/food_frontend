// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './../../components/ProfileComponents/ProfileHeader';
import ProfileCard from './../../components/ProfileComponents/ProfileCard';
import ProfileForm from './../../components/ProfileComponents/ProfileForm';
import PasswordForm from './../../components/ProfileComponents/PasswordForm';
import { fetchProfile, updateProfile } from '../../Services/Profile/profileSlice';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    joinDate: '',
    bio: '',
    // Additional fields from API
    business_name: '',
    average_rating: '',
    business_address: '',
    business_description: '',
    opening_closing_time: '',
    verification_status: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const apiProfile = await fetchProfile();
        if (apiProfile.profile_picture) {
          // Check if the URL is absolute or relative
          const imageUrl = apiProfile.profile_picture.startsWith('http') 
            ? apiProfile.profile_picture 
            : `https://xavics.pythonanywhere.com${apiProfile.profile_picture}`;
          setProfileImage(imageUrl);
        }
        // Map API response to your UI structure
        setProfile({
          name: apiProfile.business_name || '',
          email: '', // Not in API response, you might need to get this separately
          phone: apiProfile.phone || '', 
           profile_picture: apiProfile.profile_picture || null,
          role: '', // Not in API response
          joinDate: apiProfile.created_at || '',
          bio: apiProfile.business_description || '',
          // Additional fields
          business_name: apiProfile.business_name || '',
          average_rating: apiProfile.average_rating || '',
          business_address: apiProfile.business_address || '',
          business_description: apiProfile.business_description || '',
          opening_closing_time: apiProfile.opening_closing_time || '',
          verification_status: apiProfile.verification_status || '',
          // profile_picture: apiProfile.profile_picture || null
        });
        
        setTempProfile({ ...profile });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      // Prepare data for API update
      const updateData = {
        business_name: tempProfile.business_name,
        business_address: tempProfile.business_address,
        business_description: tempProfile.business_description,
        opening_closing_time: tempProfile.opening_closing_time,
        phone: tempProfile.phone
      };

      const updatedProfile = await updateProfile(updateData);
      
      // Update local state with the response
      setProfile({
        ...profile,
        ...updateData,
        name: updatedProfile.business_name,
        bio: updatedProfile.business_description
      });
      
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-red-500">
          Error loading profile: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader 
          title="Profile Management" 
          subtitle="Update your business information" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <ProfileCard 
            profile={profile}
            profileImage={profileImage}
            onImageChange={(file) => {
              const reader = new FileReader();
              reader.onloadend = () => setProfileImage(reader.result);
              reader.readAsDataURL(file);
            }}
            onPasswordToggle={() => setShowPasswordForm(!showPasswordForm)}
            additionalData={{
              rating: profile.average_rating,
              address: profile.business_address,
              hours: profile.opening_closing_time,
              status: profile.verification_status
            }}
          />

          {/* Right Column - Forms */}
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
              businessFields={true} // Flag to show business-specific fields
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

        {/* Additional Business Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Business Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="font-medium">{profile.business_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Verification Status</p>
              <p className="font-medium capitalize">{profile.verification_status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Business Address</p>
              <p className="font-medium">{profile.business_address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Operating Hours</p>
              <p className="font-medium">{profile.opening_closing_time}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Business Description</p>
              <p className="font-medium">{profile.business_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;