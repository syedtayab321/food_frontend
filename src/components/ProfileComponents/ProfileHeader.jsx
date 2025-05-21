// src/components/ProfileComponents/ProfileHeader.js
const ProfileHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">{subtitle}</p>
      <div className="mt-4 h-1 w-20 bg-red-600 rounded-full"></div>
    </div>
  );
};

export default ProfileHeader;