import './App.css'
import { Routes,Route } from 'react-router-dom';
import SidebarPage from './pages/Dashboard/SidebarPage'
function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<SidebarPage/>}/>
      </Routes>
    </>
  )
}

export default App
