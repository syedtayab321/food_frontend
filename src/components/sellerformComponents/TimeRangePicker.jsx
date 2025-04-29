import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const TimeRangePicker = ({ value, onChange, onBlur, error, touched }) => {
  const [openTime, setOpenTime] = useState('09:00');
  const [closeTime, setCloseTime] = useState('17:00');

  const handleOpenTimeChange = (time) => {
    setOpenTime(time);
    onChange(`${time} - ${closeTime}`);
  };

  const handleCloseTimeChange = (time) => {
    setCloseTime(time);
    onChange(`${openTime} - ${time}`);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="opening_closing_time" className="text-sm font-medium text-gray-700 flex items-center">
        <FaClock className="mr-2 text-red-500" />
        Business Hours*
      </label>
      <div className={`flex items-center ${error && touched ? 'border-red-500' : ''}`}>
        <div className="relative flex-grow">
          <TimePicker
            disableClock={false}
            clearIcon={null}
            value={openTime}
            onChange={handleOpenTimeChange}
            onBlur={onBlur}
            className={`w-full border rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
              error && touched ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaClock className="h-5 w-5 text-gray-400" />
          </div> */}
        </div>
        <span className="mx-2 text-gray-500">to</span>
        <div className="relative flex-grow">
          <TimePicker
            disableClock={false}
            clearIcon={null}
            value={closeTime}
            onChange={handleCloseTimeChange}
            onBlur={onBlur}
            className={`w-full border rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
              error && touched ? 'border-red-500' : 'border-gray-300'
            }`}
          />
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

export default TimeRangePicker;