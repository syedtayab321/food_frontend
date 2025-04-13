import React, { memo, useState } from 'react';
import { FaBuilding, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import { countries } from 'countries-list'; // You'll need to install this package

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessType: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const businessTypes = ['Restaurant', 'Cloud Kitchen', 'Food Truck', 'Catering Service'];

  // Password strength calculator
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Validation functions
  const validate = {
    businessName: (value) => !!value.trim() || 'Business name is required',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email address',
    phone: (value) => value.replace(/\D/g, '').length >= 10 || 'Invalid phone number',
    password: (value) => value.length >= 8 || 'Minimum 8 characters',
    confirmPassword: (value) => value === formData.password || 'Passwords do not match',
    businessType: (value) => !!value || 'Please select business type'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validate[field](formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      console.log('Form submitted:', formData);
    }
  };

  const InputField = memo (({ icon, label, type, name, placeholder, children }) => (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} *
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 ${
            errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
          }`}
          placeholder={placeholder}
          value={formData[name]}
          onChange={(e) => {
            setFormData({ ...formData, [name]: e.target.value });
            if (name === 'password') setPasswordStrength(calculateStrength(e.target.value));
            if (errors[name]) setErrors({ ...errors, [name]: null });
          }}
        />
        {children}
      </div>
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  ));

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-2xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Vendor Registration</h1>
          <p className="text-gray-600">Join our network of food service professionals</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Business Name */}
          <InputField
            icon={<FaBuilding className="w-5 h-5" />}
            label="Business Name"
            type="text"
            name="businessName"
            placeholder="Enter your business name"
          />

          {/* Email */}
          <InputField
            icon={<FaEnvelope className="w-5 h-5" />}
            label="Email Address"
            type="email"
            name="email"
            placeholder="business@example.com"
          />

          {/* Phone with Country Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number *
            </label>
            <div className="flex gap-2">
              <select className=" w-24 border rounded-lg px-2 py-2 focus:ring-2 focus:ring-red-500"
              style={{ height: '44px' }} >
              
                {Object.entries(countries).map(([code, country]) => (
                  <option key={code} value={code}>
                    {country.emoji} +{country.phone}
                  </option>
                ))}
              </select>
              <InputField
                icon={<FaPhone className="w-5 h-5" />}
                type="tel"
                name="phone"
                placeholder="123 456 7890"
                hideLabel
              />
            </div>
          </div>

          {/* Password */}
          <InputField
            icon={<FaLock className="w-5 h-5" />}
            label="Password"
            type="password"
            name="password"
            placeholder="Minimum 8 characters"
          >
            <div className="mt-2 flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-1/4 rounded ${
                    passwordStrength > i ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </InputField>

          {/* Confirm Password */}
          <InputField
            icon={<FaCheck className="w-5 h-5" />}
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
          />

          {/* Business Type */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Business Type *
            </label>
            <select
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            >
              <option value="">Select business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.businessType && (
              <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Create Vendor Account
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-red-600 hover:text-red-700 font-medium">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;