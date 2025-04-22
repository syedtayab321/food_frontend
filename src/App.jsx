import './App.css'
import { Routes,Route } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage'
import VendorSignup from './pages/Auth/signupPage';
import VendorLogin from './pages/Auth/LoginPage';
import VerifyOTP from './pages/Auth/VerifyOtp';
import ForgotPassword from './pages/Auth/ForgotPassword'
function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<VendorLogin/>}/>
          <Route path='/dashboard' element={<SidebarPage/>}/>
          <Route path='/signup' element={<VendorSignup/>}/>
          <Route path="/verify-otp/:email" element={<VerifyOTP/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App;
