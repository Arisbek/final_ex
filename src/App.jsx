import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext/index'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
