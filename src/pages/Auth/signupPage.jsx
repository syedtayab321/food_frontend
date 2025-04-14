import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaBuilding, FaEnvelope, FaPhone, FaLock, FaCheck, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { countries } from 'countries-list';

const VendorSignup = () => {
  const businessTypes = ['Restaurant', 'Cloud Kitchen', 'Food Truck', 'Catering Service'];

  // Form validation schema
  const validationSchema = Yup.object().shape({
    businessName: Yup.string()
      .required('Business name is required')
      .min(3, 'Too short (min 3 characters)')
      .max(50, 'Too long (max 50 characters)'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    countryCode: Yup.string().required('Country code is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(8, 'Too short (min 8 digits)')
      .max(15, 'Too long (max 15 digits)'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum 8 characters')
      .matches(/[a-z]/, 'Needs lowercase letter')
      .matches(/[A-Z]/, 'Needs uppercase letter')
      .matches(/[0-9]/, 'Needs number')
      .matches(/[^a-zA-Z0-9]/, 'Needs special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    businessType: Yup.string().required('Business type is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
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

  // Custom select input component
  const CustomSelect = ({ field, form, options, icon, placeholder, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
        {icon}
      </div>
      <select
        {...field}
        {...props}
        className="w-full pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 appearance-none bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <FaChevronDown className="w-4 h-4" />
      </div>
    </div>
  );

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
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Header with decorative element */}
        <div className="bg-red-600 p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Join Our Vendor Network</h1>
          <p className="text-red-100 text-sm md:text-base">Register your food business and reach more customers</p>
        </div>

        <div className="p-6 md:p-8">
          <Formik
            initialValues={{
              businessName: '',
              email: '',
              countryCode: '',
              phone: '',
              password: '',
              confirmPassword: '',
              businessType: '',
              terms: false
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Business Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="businessName" className="block text-gray-700 text-sm font-medium mb-2">
                      Business Name *
                    </label>
                    <Field
                      name="businessName"
                      type="text"
                      placeholder="Your business name"
                      component={CustomInput}
                      icon={<FaBuilding className="w-5 h-5" />}
                    />
                    <ErrorMessage name="businessName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

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

                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="block text-gray-700 text-sm font-medium mb-2">
                      Business Type *
                    </label>
                    <Field
                      name="businessType"
                      component={CustomSelect}
                      options={businessTypes}
                      placeholder="Select business type"
                      icon={<FaBuilding className="w-5 h-5" />}
                    />
                    <ErrorMessage name="businessType" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Phone Number */}
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4 sm:col-span-1">
                        <Field
                          name="countryCode"
                          component={CustomSelect}
                          options={Object.entries(countries).map(([code, country]) => ({
                            value: code,
                            label: `${country.emoji} +${country.phone}`
                          }))}
                          placeholder="Code"
                          icon={<FaGlobe className="w-5 h-5" />}
                        />
                        <ErrorMessage name="countryCode" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div className="col-span-4 sm:col-span-3">
                        <Field
                          name="phone"
                          type="tel"
                          placeholder="123 456 7890"
                          component={CustomInput}
                          icon={<FaPhone className="w-5 h-5" />}
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>
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
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start pt-2">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="terms"
                      id="terms"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-red-600 hover:text-red-500 underline">
                        Terms and Conditions
                      </a>
                    </label>
                    <ErrorMessage name="terms" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Create Vendor Account'}
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