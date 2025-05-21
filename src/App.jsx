import './App.css';
import { Routes, Route } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage';
import VendorSignup from './pages/Auth/signupPage';
import VendorLogin from './pages/Auth/LoginPage';
import VerifyOTP from './pages/Auth/VerifyOtp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import PrivateRoute from './Routes/PrivateRoutes';
import NotAuthorized from './pages/Common/ErrorAuthenticationPage';
import SellerRegistrationPage from './pages/Auth/SellerRegistration';
import AdminAccessPage from './pages/Common/AdminAcessPage';
import RegistrationPendingPage from './pages/Common/RegistrationPendingPage';
import OrderManagementPage from './pages/SideBarSections/OrdersManagement';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<VendorLogin />} />
        <Route path='/signup' element={<VendorSignup />} />
        <Route path='/verify-otp/:email' element={<VerifyOTP />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path ='/unauthorized'  element={<NotAuthorized/>}/>
        <Route path ='/admin-access'  element={<AdminAccessPage/>}/>
        <Route path ='/seller-registration'  element={<SellerRegistrationPage/>}/>
        <Route path ='/registration-pending'  element={<RegistrationPendingPage/>}/>
        <Route path='/orders' element={<OrderManagementPage />} />
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
