import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email address',
    password: (value) => value.length >= 8 || 'Minimum 8 characters'
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
      setIsSubmitting(true);
      // Submit logic here
      console.log('Login submitted:', formData);
      // setIsSubmitting(false); // Uncomment after API call
    }
  };

  const InputField = ({ icon, label, type, name, placeholder }) => (
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
            if (errors[name]) setErrors({ ...errors, [name]: null });
          }}
        />
      </div>
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-md p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Vendor Login</h1>
          <p className="text-gray-600">Access your restaurant management dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <InputField
            icon={<FaEnvelope className="w-5 h-5" />}
            label="Email Address"
            type="email"
            name="email"
            placeholder="your@email.com"
          />

          {/* Password */}
          <InputField
            icon={<FaLock className="w-5 h-5" />}
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-red-600 hover:text-red-700">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <a href="/vendor-signup" className="text-red-600 hover:text-red-700 font-medium">
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;