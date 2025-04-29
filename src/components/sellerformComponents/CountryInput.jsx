import React from 'react';
import { FaPhone } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const CountryPhoneInput = ({ value, onChange, onBlur, error, touched }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
        <FaPhone className="mr-2 text-red-500" />
        Phone Number*
      </label>
      <div className={`relative ${error && touched ? 'border-red-500 rounded-lg' : ''}`}>
        <PhoneInput
          international
          defaultCountry="US"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full pl-12 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
            error && touched ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaPhone className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default CountryPhoneInput;