// src/components/ProfileComponents/ProfileCard.js
import { FaStar, FaMapMarkerAlt, FaClock, FaShieldAlt, FaLock, FaCamera, FaPlus } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProfileCard = ({ profile, restaurantImages, onImageChange, onPasswordToggle }) => (
  <div className="lg:col-span-1">
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image Slider */}
      <div className="relative h-48 w-full bg-gray-200">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {restaurantImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img 
                src={img} 
                alt={`Restaurant ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Image Upload Button */}
        <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-red-50 transition">
          <FaCamera className="text-red-600" />
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            multiple
            onChange={(e) => onImageChange(e.target.files)}
          />
        </label>
      </div>

      <div className="px-6 pb-6">
        <div className="text-center mb-6 mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{profile.business_name}</h2>
          <div className="flex items-center justify-center mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              profile.verification_status === 'verified' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {profile.verification_status === 'verified' ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Member since {new Date(profile.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </div>

        <div className="space-y-4">
          <ProfileInfoItem 
            icon={<FaStar className="text-red-600" />}
            label="Average Rating"
            value={
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {profile.average_rating ? `${profile.average_rating}/5.0` : 'Not rated yet'}
              </div>
            }
          />
          <ProfileInfoItem 
            icon={<FaMapMarkerAlt className="text-red-600" />}
            label="Business Address"
            value={profile.business_address || 'Not specified'}
          />
          <ProfileInfoItem 
            icon={<FaClock className="text-red-600" />}
            label="Operating Hours"
            value={profile.opening_closing_time || 'Not specified'}
          />
          <ProfileInfoItem 
            icon={<FaShieldAlt className="text-red-600" />}
            label="Verification Status"
            value={profile.verification_status === 'verified' ? 'Verified' : 'Pending'}
          />
        </div>

        <button 
          onClick={onPasswordToggle}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow hover:shadow-md"
        >
          <FaLock /> Change Password
        </button>
      </div>
    </div>
  </div>
);

const ProfileInfoItem = ({ icon, label, value }) => (
  <div className="flex items-start p-3 rounded-lg hover:bg-red-50 transition duration-300">
    <div className="bg-red-100 p-2 rounded-full mr-3">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium break-words">{value}</p>
    </div>
  </div>
);

export default ProfileCard;