import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser,fetchUserData,checkSellerStatus } from '../../Services/Auth/authSlice';

const VendorLogin = () => {
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    rememberMe: Yup.boolean()
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    // 1. First login the user
    const loginResult = await dispatch(loginUser({
      email: values.email,
      password: values.password
    }));

    if (loginUser.fulfilled.match(loginResult)) {
      resetForm();
      
      // 2. Fetch user data after successful login
      const userDataResult = await dispatch(fetchUserData());
      
      if (fetchUserData.fulfilled.match(userDataResult)) {
        // 3. Check seller status
        const sellerStatusResult = await dispatch(checkSellerStatus());
        
        if (checkSellerStatus.fulfilled.match(sellerStatusResult)) {
          if (sellerStatusResult.payload.isSeller) {
            navigate('/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          // Handle seller status check failure
          console.error('Failed to check seller status:', sellerStatusResult.payload || sellerStatusResult.error.message);
          navigate('/'); // Fallback navigation
        }
      } else {
        // Handle user data fetch failure
        console.error('Failed to fetch user data:', userDataResult.payload || userDataResult.error.message);
        navigate('/'); // Return to login
      }
    } else {
      // Handle login failure
      console.error('Login failed:', loginResult.payload || loginResult.error.message);
    }
  } catch (err) {
    console.error('Unexpected error during login:', err);
  } finally {
    setSubmitting(false);
  }
};
  

  const CustomInput = ({ field, form, icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
        {icon}
      </div>
      <input
        {...field}
        {...props}
        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
          form.touched[field.name] && form.errors[field.name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header with decorative stripe */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-red-100 text-sm md:text-base">Sign in to your vendor dashboard</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Display error message if login fails */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      component={CustomInput}
                      icon={<FaEnvelope className="w-4 h-4" />}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                      Password *
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      component={CustomInput}
                      icon={<FaLock className="w-4 h-4" />}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link to='/forgot-password' className="font-medium text-red-600 hover:text-red-500">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {(isSubmitting || loading) ? (
                        'Signing in...'
                      ) : (
                        <>
                          Sign In <FaArrowRight className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Signup Link */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link
                        to="/signup"
                        className="font-medium text-red-600 hover:text-red-700 underline"
                      >
                        Create account
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;