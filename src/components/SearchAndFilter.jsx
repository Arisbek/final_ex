import { useState } from 'react'
import './SearchAndFilter.css'

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    behavior: 'all',
    priceRange: 'all',
    age: 'all'
  })

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase().trim()
    setSearchTerm(value)
    // Pass a search function instead of just the value
    onSearch((dog) => {
      if (!value) return true // Show all dogs if search is empty
      return dog.breed.toLowerCase().includes(value)
    })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div className="search-filter-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dogs by breed..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filters">
        <select
          name="behavior"
          value={filters.behavior}
          onChange={handleFilterChange}
        >
          <option value="all">All Behaviors</option>
          <option value="Friendly">Friendly</option>
          <option value="Active">Active</option>
          <option value="Loyal">Loyal</option>
        </select>

        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
        >
          <option value="all">All Prices</option>
          <option value="0-1000">$0 - $1000</option>
          <option value="1001-1500">$1001 - $1500</option>
          <option value="1501-2000">$1501 - $2000</option>
          <option value="2001+">$2001+</option>
        </select>

        <select
          name="age"
          value={filters.age}
          onChange={handleFilterChange}
        >
          <option value="all">All Ages</option>
          <option value="10">10 years</option>
        </select>
      </div>
    </div>
  )
}

export default SearchAndFilter 