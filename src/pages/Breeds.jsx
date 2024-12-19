import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dogApi } from '../services/api'
import './Breeds.css'

const Breeds = () => {
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const { message } = await dogApi.getAllBreeds()
        setBreeds(Object.keys(message))
      } catch (error) {
        console.error('Error fetching breeds:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBreeds()
  }, [])

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="loading">Loading breeds...</div>

  return (
    <div className="breeds-container">
      <h1>Dog Breeds</h1>
      <div className="breeds-filter">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="breeds-search"
        />
      </div>
      <div className="breeds-grid">
        {filteredBreeds.map((breed) => (
          <Link to={`/dog/${breed}`} key={breed}>
            <div className="breed-card">
              <h3>{breed}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Breeds 