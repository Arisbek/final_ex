import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dogApi, mockDogData } from '../services/api'
import './DogDetails.css'

const DogDetails = () => {
  const { id } = useParams()
  const [dog, setDog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const { message: imageUrl } = await dogApi.getRandomDogByBreed(id)
        const details = mockDogData.getDogDetails(id)
        setDog({
          id,
          breed: id,
          image: imageUrl,
          ...details
        })
      } catch (error) {
        console.error('Error fetching dog details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDogDetails()
  }, [id])

  if (loading) return <div className="loading">Loading dog details...</div>
  if (!dog) return <div className="error">Dog not found</div>

  return (
    <div className="dog-details">
      <img src={dog.image} alt={dog.breed} className="dog-details-image" />
      <div className="dog-details-info">
        <div className="dog-details-header">
          <h1>{dog.breed}</h1>
          <span className="dog-details-price">${dog.price}</span>
        </div>
        <div className="dog-details-behavior">
          Behavior: {dog.behavior}
        </div>
        <div className="dog-details-description">
          <h3>Comments:</h3>
          {dog.comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.user}:</strong> {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DogDetails 