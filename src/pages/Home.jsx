import { useState, useEffect } from 'react'
import DogCard from '../components/DogCard'
import { dogApi, mockDogData } from '../services/api'
import './Home.css'

const Home = () => {
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { message: breeds } = await dogApi.getAllBreeds()
        const dogsList = await Promise.all(
          Object.keys(breeds).slice(0, 8).map(async (breed) => {
            const { message: imageUrl } = await dogApi.getRandomDogByBreed(breed)
            const details = mockDogData.getDogDetails(breed)
            return {
              id: breed,
              breed,
              image: imageUrl,
              ...details
            }
          })
        )
        setDogs(dogsList)
      } catch (error) {
        console.error('Error fetching dogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [])

  if (loading) {
    return <div className="loading">Loading awesome dogs... 🐕</div>
  }

  return (
    <div className="home">
      <h1>Featured Dogs</h1>
      <div className="dogs-grid">
        {dogs.map((dog) => (
          <DogCard key={dog.id} {...dog} />
        ))}
      </div>
    </div>
  )
}

export default Home 