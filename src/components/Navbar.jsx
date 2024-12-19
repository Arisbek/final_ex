import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🐕 DogStore</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/breeds">Breeds</Link>
        {user ? (
          <>
            <Link to="/favorites">Favorites</Link>
            <button onClick={logout} className="nav-button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-button">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar 