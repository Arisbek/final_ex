import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Breeds from '../pages/Breeds'
import DogDetails from '../pages/DogDetails'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/breeds" element={<Breeds />} />
      <Route path="/dog/:id" element={<DogDetails />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default AppRoutes 