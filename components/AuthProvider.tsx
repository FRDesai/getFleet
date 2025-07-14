'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/check-session', {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        setIsAuthenticated(data.isAuthenticated)
      } catch (err) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const logout = async () => {
    // optional: make API call to logout if backend supports session destroy
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {!loading && children}
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
