import { createContext, useContext, useState, useEffect  } from 'react'

const AuthContext = createContext(null)

// Mock user storage
const USERS_STORAGE_KEY = 'dog_store_users'
const FAVORITES_STORAGE_KEY = 'dog_store_favorites'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])

  const getUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  }

  useEffect(() => {
    if (user) {
      const userFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '{}')
      setFavorites(userFavorites[user.id] || [])
    } else {
      setFavorites([])
    }
  }, [user])

  const register = async ({ username, email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
    
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists')
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password
    }

    users.push(newUser)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    return true
  }

  const login = async (email, password) => {
    const users = getUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Don't include password in the session
    const { password: _, ...userWithoutPassword } = user
    setUser(userWithoutPassword)
    return userWithoutPassword
  }

  const addToFavorites = (dog) => {
    if (!user) return false

    const newFavorites = [...favorites, dog]
    setFavorites(newFavorites)
    
    const allFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '{}')
    allFavorites[user.id] = newFavorites
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(allFavorites))
    
    return true
  }

  const removeFromFavorites = (dogId) => {
    if (!user) return false

    const newFavorites = favorites.filter(dog => dog.id !== dogId)
    setFavorites(newFavorites)
    
    const allFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '{}')
    allFavorites[user.id] = newFavorites
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(allFavorites))
    
    return true
  }

  const isFavorite = (dogId) => {
    return favorites.some(dog => dog.id === dogId)
  }

  const logout = () => {
    setUser(null)
    setFavorites([])
  }

  return (
    <AuthContext.Provider value={{
         user, 
         error, 
         favorites,
         addToFavorites,
         removeFromFavorites,
         isFavorite,
         register, 
         login, 
         logout,
         }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 