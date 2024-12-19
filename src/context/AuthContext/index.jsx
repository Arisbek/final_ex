import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock user storage
const USERS_STORAGE_KEY = 'dog_store_users'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const getUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  }

  const register = async ({ username, email, password }) => {
    const users = getUsers()
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists')
    }

    // Store new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password // In a real app, you'd hash the password
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

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
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