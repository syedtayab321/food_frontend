import './App.css'
import { Routes,Route } from 'react-router-dom'
import TailwindPage from './pages/Home'
function App() {

  return (
    <>
      <Routes>
           <Route path='/'  element={<TailwindPage/>}/>
      </Routes>
    </>
  )
}

export default App
