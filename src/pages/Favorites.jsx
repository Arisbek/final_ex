import { useState, useEffect } from 'react'
import DogCard from '../components/DogCard'
import { useAuth } from '../context/AuthContext'
import './Favorites.css'

const Favorites = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // In a real app, you would fetch favorites from an API
    setFavorites([])
  }, [user])

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No favorites yet</h2>
        <p>Start adding some dogs to your favorites!</p>
      </div>
    )
  }

  return (
    <div className="favorites">
      <h1>Your Favorite Dogs</h1>
      <div className="dogs-grid">
        {favorites.map((dog) => (
          <DogCard key={dog.id} {...dog} />
        ))}
      </div>
    </div>
  )
}

export default Favorites 