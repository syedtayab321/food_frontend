// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ text = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-8 w-8 border-3',
    medium: 'h-12 w-12 border-4',
    large: 'h-16 w-16 border-[5px]'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="flex flex-col justify-center items-center space-y-4 p-8 bg-white rounded-xl shadow-2xl">
        <div className="relative">
          <div
            className={`animate-spin rounded-full ${sizeClasses[size]} border-solid border-gray-100 border-t-blue-500 border-r-blue-400 border-b-blue-300`}
            style={{ animationDuration: '1.2s' }}
            aria-label="Loading"
          />
          {size !== 'small' && (
            <div
              className={`absolute top-0 left-0 animate-spin rounded-full ${sizeClasses[size]} border-solid border-transparent border-t-pink-500 border-r-pink-400`}
              style={{ animationDuration: '2s', animationDirection: 'reverse' }}
            />
          )}
        </div>
        {text && (
          <div className="flex space-x-2">
            <p className="text-gray-700 font-medium text-lg animate-pulse">
              {text}
            </p>
            <span className="flex items-end space-x-1">
              <span className="animate-bounce inline-block h-1 w-1 rounded-full bg-blue-500" style={{ animationDelay: '0.1s' }} />
              <span className="animate-bounce inline-block h-1 w-1 rounded-full bg-blue-500" style={{ animationDelay: '0.2s' }} />
              <span className="animate-bounce inline-block h-1 w-1 rounded-full bg-blue-500" style={{ animationDelay: '0.3s' }} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;