import './App.css'
import { Routes,Route } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage'
import LogoutModal from './Models/Common/LogoutModal';
import VendorSignup from './pages/signupPage';
import VendorLogin from './pages/LoginPage';

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<SidebarPage/>}/>
          <Route path='/logout' element={<LogoutModal/>}/>
          <Route path='/signup' element={<VendorSignup/>}/>
          <Route path='/login' element={<VendorLogin/>}/>
          {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App
