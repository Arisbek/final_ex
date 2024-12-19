import { useState } from 'react'
import { Link } from 'react-router-dom'
import './DogCard.css'

const DogCard = ({ id, image, breed, price, behavior, comments }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState('')

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <article className="dog-card">
      <div className="card-header">
        <h3>{breed}</h3>
      </div>

      <div className="card-image">
        <img src={image} alt={breed} />
      </div>

      <div className="card-actions">
        <button 
          onClick={handleLike}
          className={`like-button ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <span className="price">${price}</span>
      </div>

      <div className="card-info">
        <span className="behavior-tag">{behavior}</span>
        <Link to={`/dog/${id}`} className="details-link">
          View Details
        </Link>
      </div>

      <div className="comments-section">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user}</strong> {comment.text}
          </div>
        ))}
      </div>
    </article>
  )
}

export default DogCard 