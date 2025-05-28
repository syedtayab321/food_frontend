import './App.css';
import { Routes, Route,useNavigate } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage';
import VendorSignup from './pages/Auth/signupPage';
import VendorLogin from './pages/Auth/LoginPage';
import VerifyOTP from './pages/Auth/VerifyOtp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import NotAuthorized from './pages/Common/ErrorAuthenticationPage';
import SellerRegistrationPage from './pages/Auth/SellerRegistration';
import AdminAccessPage from './pages/Common/AdminAcessPage';
import RegistrationPendingPage from './pages/Common/RegistrationPendingPage';
import { SellerRoute, AuthenticatedRoute, PublicRoute } from './Routes/PrivateRoutes';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        {/* Public routes (only accessible when not logged in) */}
        <Route element={<PublicRoute />}>
          <Route path='/' element={<VendorLogin />} />
          <Route path='/signup' element={<VendorSignup />} />
          <Route path='/verify-otp/:email' element={<VerifyOTP />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>

        {/* Common error pages (accessible to all) */}
        <Route path='/unauthorized' element={<NotAuthorized/>}/>
        <Route path='/registration-pending' element={<RegistrationPendingPage/>}/>
        
        {/* Authenticated but not seller routes */}
        <Route element={<AuthenticatedRoute />}>
          <Route path='/admin-access' element={<AdminAccessPage/>}/>
          <Route path='/seller-registration' element={<SellerRegistrationPage/>}/>
          <Route path='/dashboard/*' element={<SidebarPage />} />
        </Route>
        
        {/* Seller-only routes */}
        <Route element={<SellerRoute />}>
          <Route path='/dashboard/*' element={<SidebarPage />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;