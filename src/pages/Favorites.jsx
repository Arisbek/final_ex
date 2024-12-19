import { useAuth } from '../context/AuthContext'
import DogCard from '../components/DogCard'
import './Favorites.css'

const Favorites = () => {
  const { favorites } = useAuth()

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No favorites yet</h2>
        <p>Start adding some dogs to your favorites!</p>
        <img 
          src="/empty-favorites.png" 
          alt="No favorites" 
          className="empty-illustration"
        />
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