import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  registerSeller, 
  selectRegistrationStatus, 
  selectRegistrationError, 
  resetRegistrationStatus 
} from './../../Services/Auth/sellerSlice';
import { FaStore, FaMapMarkerAlt, FaInfoCircle, FaClock, FaCamera } from 'react-icons/fa';
import CountryPhoneInput from './../../components/sellerformComponents/CountryInput';
import TimeRangePicker from './../../components/sellerformComponents/TimeRangePicker';

const SellerRegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectRegistrationStatus);
  const error = useSelector(selectRegistrationError);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Validation schema
  const validationSchema = Yup.object().shape({
    business_name: Yup.string()
      .required('Business name is required')
      .min(3, 'Business name must be at least 3 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Phone number must be valid', value => {
        if (!value) return false;
        return value.replace(/\D/g, '').length >= 10;
      }),
    business_address: Yup.string()
      .required('Business address is required')
      .min(10, 'Address must be at least 10 characters'),
    business_description: Yup.string()
      .required('Business description is required')
      .min(20, 'Description must be at least 20 characters'),
    opening_closing_time: Yup.string()
      .required('Business hours are required')
      .test('valid-time-range', 'Please select valid opening and closing times', value => {
        if (!value) return false;
        const [open, close] = value.split('-').map(t => t.trim());
        return open && close;
      }),
    profile_picture: Yup.mixed()
      .required('Business logo is required')
      .test('fileSize', 'File too large (max 5MB)', value => value && value.size <= 5000000)
      .test('fileType', 'Unsupported file type (only JPEG/PNG)', value => 
        value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
  });

  const formik = useFormik({
    initialValues: {
      business_name: '',
      phone: '',
      business_address: '',
      business_description: '',
      opening_closing_time: '09:00 - 17:00',
      profile_picture: null,
      average_rating: '1.0',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        
        // Append all form values including the file
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'profile_picture' && value) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, value);
          }
        });

        // Debug FormData before submission
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }

        // Dispatch the registration action
        const result = await dispatch(registerSeller(formData));
        
        if (registerSeller.fulfilled.match(result)) {
          navigate('/registration-pending', {
            state: { email: values.email }
          });
        } else if (result.payload?.errors) {
          setErrors(result.payload.errors);
        } else {
          setErrors({ 
            general: result.payload?.message || 'Registration failed. Please try again.' 
          });
        }
      } catch (error) {
        setErrors({ 
          general: 'An unexpected error occurred. Please try again later.' 
        });
        console.error('Registration error:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      // Validate file type and size before setting it
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        formik.setFieldError('profile_picture', 'Unsupported file type (only JPEG/PNG)');
        return;
      }
      if (file.size > 5000000) {
        formik.setFieldError('profile_picture', 'File too large (max 5MB)');
        return;
      }
      
      formik.setFieldValue('profile_picture', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue('profile_picture', null);
      setPreviewImage(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (status === 'succeeded') {
      formik.resetForm();
      setPreviewImage(null);
      const timer = setTimeout(() => dispatch(resetRegistrationStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-2xl border border-red-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-red-600 mb-2">Join Our Marketplace</h2>
          <p className="text-gray-600">Register your business and start selling today</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={triggerFileInput}
            >
              {previewImage ? (
                <img src={previewImage} alt="Business logo preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <FaCamera className="text-3xl mb-2" />
                  <span className="text-xs">Upload Logo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              name="profile_picture"
              id="profile_picture"
            />
            {formik.touched.profile_picture && formik.errors.profile_picture && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {formik.errors.profile_picture}
              </p>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {status === 'succeeded' && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">Registration successful! You can now log in.</p>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0116 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{error || 'Registration failed. Please try again.'}</p>
            </div>
          </div>
        )}

        <form 
          className="space-y-6" 
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="space-y-2">
              <label htmlFor="business_name" className="text-sm font-medium text-gray-700 flex items-center">
                <FaStore className="mr-2 text-red-500" />
                Business Name*
              </label>
              <div className="relative">
                <input
                  id="business_name"
                  name="business_name"
                  type="text"
                  autoComplete="organization"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                    formik.touched.business_name && formik.errors.business_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formik.values.business_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your business name"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaStore className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {formik.touched.business_name && formik.errors.business_name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {formik.errors.business_name}
                </p>
              )}
            </div>

            {/* Phone with Country Picker */}
            <CountryPhoneInput
              value={formik.values.phone}
              onChange={value => formik.setFieldValue('phone', value)}
              onBlur={formik.handleBlur}
              error={formik.errors.phone}
              touched={formik.touched.phone}
            />

            {/* Business Address */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="business_address" className="text-sm font-medium text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                Business Address*
              </label>
              <div className="relative">
                <textarea
                  id="business_address"
                  name="business_address"
                  rows={3}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                    formik.touched.business_address && formik.errors.business_address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formik.values.business_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Full business address"
                />
                <div className="absolute top-3 left-3">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {formik.touched.business_address && formik.errors.business_address && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {formik.errors.business_address}
                </p>
              )}
            </div>

            {/* Business Description */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="business_description" className="text-sm font-medium text-gray-700 flex items-center">
                <FaInfoCircle className="mr-2 text-red-500" />
                Business Description*
              </label>
              <div className="relative">
                <textarea
                  id="business_description"
                  name="business_description"
                  rows={3}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                    formik.touched.business_description && formik.errors.business_description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formik.values.business_description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Tell us about your business"
                />
                <div className="absolute top-3 left-3">
                  <FaInfoCircle className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {formik.touched.business_description && formik.errors.business_description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {formik.errors.business_description}
                </p>
              )}
            </div>

            {/* Opening/Closing Time */}
            <div className="space-y-2 md:col-span-2">
              <TimeRangePicker
                value={formik.values.opening_closing_time}
                onChange={value => formik.setFieldValue('opening_closing_time', value)}
                onBlur={formik.handleBlur}
                error={formik.errors.opening_closing_time}
                touched={formik.touched.opening_closing_time}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering Your Business...
                </>
              ) : (
                <>
                  <FaStore className="mr-2" />
                  Register Business
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Already have an account? <a href="#" className="font-medium text-red-600 hover:text-red-500">Sign in</a></p>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;