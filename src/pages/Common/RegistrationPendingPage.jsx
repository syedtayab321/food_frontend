import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiClock, FiCheckCircle, FiAlertCircle, FiUserCheck } from 'react-icons/fi';

const RegistrationPendingPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [isVisible, setIsVisible] = useState(true);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsVisible(false);
          setTimeout(() => navigate('/'), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 transition-opacity duration-500">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl transform transition-all duration-300 hover:shadow-2xl">
        {/* Header with animated background */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-300 rounded-full filter blur-3xl opacity-30"></div>
          </div>
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <div className="relative">
                <FiUserCheck className="text-white text-5xl animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-white border-opacity-30 animate-ping opacity-0"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Registration Submitted!</h1>
            <p className="text-purple-100">Your application is under review</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Status card */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-start">
              <FiCheckCircle className="text-blue-500 text-2xl mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Successfully Submitted</h3>
                <p className="text-blue-600 text-sm mt-1">
                  We've received your seller registration details. Our team is reviewing your application.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                <FiClock className="mr-2 text-indigo-500" /> What happens next?
              </h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    </div>
                    <div className="w-px h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-gray-800">Admin Review</p>
                    <p className="text-sm text-gray-600">Our team will verify your business details (1-2 business days)</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    </div>
                    <div className="w-px h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-gray-800">Email Notification</p>
                    <p className="text-sm text-gray-600">You'll receive an email once your account is approved</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Dashboard Access</p>
                    <p className="text-sm text-gray-600">Log in to access your seller dashboard with full features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown and action */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <FiAlertCircle className="text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    This page will automatically close in {formatTime(countdown)}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>

            {/* Support card */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2">Need help?</h3>
              <p className="text-sm text-purple-600 mb-3">
                Contact our support team if you have any questions about your registration.
              </p>
              <button className="text-sm text-purple-700 font-medium hover:text-purple-800 flex items-center">
                <FiMail className="mr-1" /> Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPendingPage;