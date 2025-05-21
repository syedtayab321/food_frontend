// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './../../components/ProfileComponents/ProfileHeader';
import ProfileCard from './../../components/ProfileComponents/ProfileCard';
import ProfileForm from './../../components/ProfileComponents/ProfileForm';
import PasswordForm from './../../components/ProfileComponents/PasswordForm';
import { fetchProfile, updateProfile } from '../../Services/Profile/profileSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    joinDate: '',
    bio: '',
    business_name: '',
    average_rating: '',
    business_address: '',
    business_description: '',
    opening_closing_time: '',
    verification_status: '',
    cuisine_type: '',
    seating_capacity: '',
    payment_methods: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [restaurantImages, setRestaurantImages] = useState([
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const apiProfile = await fetchProfile();

        const mappedProfile = {
          name: apiProfile.business_name || '',
          email: '', // Not in API response
          phone: apiProfile.phone || '', 
          profile_picture: apiProfile.profile_picture || null,
          role: '',
          joinDate: apiProfile.created_at || '',
          bio: apiProfile.business_description || '',
          business_name: apiProfile.business_name || '',
          average_rating: apiProfile.average_rating || '',
          business_address: apiProfile.business_address || '',
          business_description: apiProfile.business_description || '',
          opening_closing_time: apiProfile.opening_closing_time || '',
          verification_status: apiProfile.verification_status || '',
          cuisine_type: apiProfile.cuisine_type || 'Not specified',
          seating_capacity: apiProfile.seating_capacity || 'Not specified',
          payment_methods: apiProfile.payment_methods || 'Cash, Credit Cards'
        };

        setProfile(mappedProfile);
        setTempProfile({ ...mappedProfile });
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
      const updateData = {
        business_name: tempProfile.business_name,
        business_address: tempProfile.business_address,
        business_description: tempProfile.business_description,
        opening_closing_time: tempProfile.opening_closing_time,
        phone: tempProfile.phone,
        cuisine_type: tempProfile.cuisine_type,
        seating_capacity: tempProfile.seating_capacity,
        payment_methods: tempProfile.payment_methods
      };

      const updatedProfile = await updateProfile(updateData);
      
      setProfile({
        ...profile,
        ...updateData,
        name: updatedProfile.business_name,
        bio: updatedProfile.business_description
      });
      
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.message || 'Failed to update profile');
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
          title="Restaurant Dashboard" 
          subtitle="Manage your restaurant profile and settings" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Restaurant Profile Card */}
          <ProfileCard 
            profile={profile}
            restaurantImages={restaurantImages}
            onImageChange={(files) => {
              const newImages = [...restaurantImages];
              Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  newImages.push(reader.result);
                  setRestaurantImages(newImages);
                };
                reader.readAsDataURL(file);
              });
            }}
            onPasswordToggle={() => setShowPasswordForm(!showPasswordForm)}
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
              businessFields={true}
              isLoading={loading}
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

        {/* Additional Restaurant Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Restaurant Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Payment Methods"
                value={profile.payment_methods}
              />
              <DetailCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                }
                title="Cuisine Type"
                value={profile.cuisine_type}
              />
              <DetailCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Seating Capacity"
                value={profile.seating_capacity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 hover:bg-red-50 transition duration-300">
    <div className="flex items-center mb-3">
      <div className="bg-red-100 p-2 rounded-full text-red-600 mr-3">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-700">{title}</h4>
    </div>
    <p className="text-gray-600 pl-11">{value}</p>
  </div>
);

export default ProfilePage;