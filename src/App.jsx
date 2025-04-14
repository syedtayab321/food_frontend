import './App.css'
import { Routes,Route } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage'
import VendorSignup from './pages/Auth/signupPage';
import VendorLogin from './pages/Auth/LoginPage';

function App() {

  return (
    <>
      <Routes>
          <Route path='/dashboard' element={<SidebarPage/>}/>
          <Route path='/signup' element={<VendorSignup/>}/>
          <Route path='/' element={<VendorLogin/>}/>
          {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App
