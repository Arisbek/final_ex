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
      <div className="dog-details-header">
        <h1>{dog.breed}</h1>
        <div className="dog-meta">
          <span className="dog-price">${dog.price}</span>
          <span className="dog-age">{dog.age} years old</span>
        </div>
      </div>

      <div className="dog-details-content">
        <div className="dog-image-container">
          <img src={dog.image} alt={dog.breed} className="dog-details-image" />
        </div>

        <div className="dog-info-container">
          <div className="info-section">
            <h2>About</h2>
            <p>{dog.description}</p>
          </div>

          <div className="info-section">
            <h2>Characteristics</h2>
            <div className="characteristics">
              <span className="behavior-tag">{dog.behavior}</span>
              <span className="age-tag">Adult • {dog.age} years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DogDetails 