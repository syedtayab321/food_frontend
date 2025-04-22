import React, { useState, useRef, useEffect } from 'react';
import { FaLock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate , useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  verifySignupOtp,
  resendSignupOtp,
  setOtp,
  updateResendCooldown,
  clearOtpState,
  resetVerification
} from './../../Services/Auth/otpSlice'; 

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const {
    otp: reduxOtp,
    verifyLoading,
    resendLoading,
    error,
    resendError,
    resendCooldown,
    isVerified,
    success
  } = useSelector((state) => state.otpVerification);

  const [localOtp, setLocalOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { email } = useParams();

  // Initialize email in Redux store
  useEffect(() => {
    dispatch(resetVerification());
  }, [dispatch]);

  // Sync local OTP state with Redux
  useEffect(() => {
    if (reduxOtp.length === 6) {
      setLocalOtp(reduxOtp.split(''));
    }
  }, [reduxOtp]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => dispatch(updateResendCooldown(resendCooldown - 1)), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, dispatch]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...localOtp];
    newOtp[index] = value.substring(value.length - 1);
    setLocalOtp(newOtp);
    dispatch(setOtp(newOtp.join('')));

    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit if last digit entered
    if (index === 5 && value) {
      handleSubmit();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !localOtp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    const enteredOtp = localOtp.join('');
    if (enteredOtp.length !== 6) {
      dispatch(clearOtpState());
      return;
    }

    dispatch(verifySignupOtp({ email, otp: enteredOtp }));
  };

  const resendOTP = () => {
    dispatch(resendSignupOtp(email));
    dispatch(updateResendCooldown(60));
    setLocalOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  // Redirect on successful verification
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVerified, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white text-center">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-4 top-4 text-white hover:text-red-200 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaLock className="text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
          <p className="opacity-90">
            {isVerified ? 'Verification successful!' : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {isVerified ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="flex justify-center mb-6">
                <FaCheckCircle className="text-6xl text-green-500 animate-bounce" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Verification Complete!</h2>
              <p className="text-gray-600">Redirecting you to your dashboard...</p>
            </motion.div>
          ) : (
            <>
              {(error || resendError) && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                >
                  {error || resendError}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    Enter Verification Code
                  </label>
                  <div className="flex justify-between space-x-2">
                    {localOtp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-full h-14 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                        disabled={verifyLoading}
                      />
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={verifyLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                >
                  {verifyLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify Account'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Didn't receive code?{' '}
                  <button
                    onClick={resendOTP}
                    disabled={resendLoading || resendCooldown > 0}
                    className={`font-medium ${(resendLoading || resendCooldown > 0) ? 'text-gray-400' : 'text-red-600 hover:text-red-800'} transition-colors`}
                  >
                    {resendLoading ? 'Sending...' : 
                     resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;