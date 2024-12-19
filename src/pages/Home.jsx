import { useState, useEffect } from 'react'
import DogCard from '../components/DogCard'
import Pagination from '../components/Pagination'
import SearchAndFilter from '../components/SearchAndFilter'
import { dogApi, mockDogData } from '../services/api'
import './Home.css'

const DOGS_PER_PAGE = 12

const Home = () => {
  const [dogs, setDogs] = useState([])
  const [filteredDogs, setFilteredDogs] = useState(dogs)
  const handleSearch = (searchFn) => {
    const filtered = dogs.filter(searchFn)
    setFilteredDogs(filtered)
  }
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)




  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true)
        const { message: breeds } = await dogApi.getAllBreeds()
        
        const allBreeds = Object.entries(breeds).flatMap(([breed, subBreeds]) => {
          if (subBreeds.length === 0) return [breed]
          return [breed, ...subBreeds.map(sub => `${breed}-${sub}`)]
        })

        const dogsList = await Promise.all(
          allBreeds.map(async (breed) => {
            const { message: imageUrl } = await dogApi.getRandomDogByBreed(breed)
            const details = mockDogData.getDogDetails(breed)
            return {
              id: breed,
              breed: breed.replace(/-/g, ' '),
              image: imageUrl,
              ...details
            }
          })
        )

        setDogs(dogsList)
        setFilteredDogs(dogsList)
      } catch (error) {
        console.error('Error fetching dogs:', error)
        setError('Failed to fetch dogs. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [])

//   const handleSearch = (searchTerm) => {
//     filterDogs(searchTerm.toLowerCase())
//   }

  const handleFilter = (filters) => {
    filterDogs('', filters)
  }

  const filterDogs = (searchTerm = '', filters = {}) => {
    let filtered = [...dogs]

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(dog => 
        dog.breed.toLowerCase().includes(searchTerm)
      )
    }

    // Apply filters
    if (filters.behavior !== 'all') {
      filtered = filtered.filter(dog => dog.behavior === filters.behavior)
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(dog => {
        if (max) {
          return dog.price >= min && dog.price <= max
        }
        return dog.price >= min
      })
    }

    if (filters.age !== 'all') {
      filtered = filtered.filter(dog => dog.age === Number(filters.age))
    }

    setFilteredDogs(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Pagination
  const indexOfLastDog = currentPage * DOGS_PER_PAGE
  const indexOfFirstDog = indexOfLastDog - DOGS_PER_PAGE
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog)
  const totalPages = Math.ceil(filteredDogs.length / DOGS_PER_PAGE)

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="home">
      <h1>Featured Dogs</h1>
      
      <SearchAndFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      {loading ? (
        <div className="loading-grid">
          {[...Array(DOGS_PER_PAGE)].map((_, index) => (
            <div key={index} className="dog-card-skeleton" />
          ))}
        </div>
      ) : (
        <>
          {filteredDogs.length === 0 ? (
            <div className="no-results">
              <h2>No dogs found</h2>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="dogs-grid">
                {currentDogs.map((dog) => (
                  <DogCard key={dog.id} {...dog} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Home 