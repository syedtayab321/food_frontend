import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './../../Services/Auth/authSlice'; 
import { CircularProgress } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const VendorSignup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum 8 characters')
      .matches(/[a-z]/, 'Needs lowercase letter')
      .matches(/[A-Z]/, 'Needs uppercase letter')
      .matches(/[0-9]/, 'Needs number')
      .matches(/[^a-zA-Z0-9]/, 'Needs special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  // Password strength indicator
  const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    };

    const strength = getStrength(password || '');
    const strengthText = ['Very Weak', 'Weak', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

    return (
      <div className="mt-1">
        <div className="flex gap-1 h-1.5 mb-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-full w-full rounded-full ${
                strength > i ? strengthColors[i] : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className={`text-xs ${
          strength === 0 ? 'text-gray-500' : 
          strength < 2 ? 'text-red-500' : 
          strength === 2 ? 'text-yellow-500' : 'text-green-500'
        }`}>
          {password ? strengthText[strength - 1] || '' : 'Enter a password'}
        </p>
      </div>
    );
  };

  // Custom input component
  const CustomInput = ({ field, form, icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
        {icon}
      </div>
      <input
        {...field}
        {...props}
        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 ${
          form.touched[field.name] && form.errors[field.name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header with decorative element */}
        <div className="bg-red-600 p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Vendor Sign Up</h1>
          <p className="text-red-100 text-sm md:text-base">Create your vendor account</p>
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(signupUser({
                email: values.email,
                password: values.password,
                re_password: values.confirmPassword
              }));
              navigate(`/verify-otp/${values.email}`);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4 md:space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="business@example.com"
                    component={CustomInput}
                    icon={<FaEnvelope className="w-5 h-5" />}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                    Password *
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    component={CustomInput}
                    icon={<FaLock className="w-5 h-5" />}
                  />
                  <PasswordStrengthIndicator password={values.password} />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                    Confirm Password *
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    component={CustomInput}
                    icon={<FaCheck className="w-5 h-5" />}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} color="inherit" className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-600 text-sm pt-2">
                  Already have an account?{' '}
                  <a href="/" className="text-red-600 hover:text-red-700 font-medium underline">
                    Sign in here
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;