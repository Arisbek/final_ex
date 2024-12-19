import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './DogCard.css'

const DogCard = ({ 
  id, 
  image, 
  breed, 
  price, 
  age,
  behavior, 
  description 
}) => {
  const { user, isFavorite, addToFavorites, removeFromFavorites } = useAuth()
  const isLiked = isFavorite(id)

  const handleFavoriteClick = () => {
    if (!user) {
      alert('Please login to add favorites!')
      return
    }

    if (isLiked) {
      removeFromFavorites(id)
    } else {
      addToFavorites({ id, image, breed, price, age, behavior, description })
    }
  }

  return (
    <article className="dog-card">
      <div className="card-header">
        <h3>{breed}</h3>
      </div>

      <div className="card-image">
        <img src={image} alt={breed} />
      </div>

      <div className="card-info">
        <div className="price-age">
          <span className="price">${price}</span>
          <span className="age">{age} years old</span>
        </div>
        <span className="behavior-tag">{behavior}</span>
      </div>

      <div className="card-description">
        <p>{description?.slice(0, 100)}...</p>
      </div>

      <div className="card-actions">
        <button 
          onClick={handleFavoriteClick}
          className={`favorite-button ${isLiked ? 'favorited' : ''}`}
          title={user ? 'Add to favorites' : 'Login to add favorites'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <Link to={`/dog/${id}`} className="details-button">
          View Details
        </Link>
      </div>
    </article>
  )
}

export default DogCard 