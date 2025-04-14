const ProfileHeader = ({ title, subtitle }) => (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-red-600">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
  
  export default ProfileHeader;