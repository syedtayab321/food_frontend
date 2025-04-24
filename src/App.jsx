import './App.css';
import { Routes, Route } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage';
import VendorSignup from './pages/Auth/signupPage';
import VendorLogin from './pages/Auth/LoginPage';
import VerifyOTP from './pages/Auth/VerifyOtp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import PrivateRoute from './Routes/PrivateRoutes';
import NotAuthorized from './pages/Common/ErrorAuthenticationPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<VendorLogin />} />
        <Route path='/signup' element={<VendorSignup />} />
        <Route path='/verify-otp/:email' element={<VerifyOTP />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path ='/unauthorized'  element={<NotAuthorized/>}/>
        
        {/* Protected Dashboard Route */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <SidebarPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
