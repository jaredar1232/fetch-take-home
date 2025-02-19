import { createContext, useContext, useState, useEffect } from 'react'
import LoadingPawPrints from '../components/LoadingPawPrints'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    // Check if authenticated by hitting an auth protected endpoint
    const checkAuth = async () => {
        const url =
            'https://frontend-take-home-service.fetch.com/dogs/search?size=1'
        try {
            const response = await fetch(url, {
                credentials: 'include',
            })
            if (response.ok) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error('Error checking authentication:', error.message)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    // Run once on mount
    useEffect(() => {
        checkAuth()
    }, [])

    const login = async (name, email) => {
        const url = 'https://frontend-take-home-service.fetch.com/auth/login'
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, email }),
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            console.log('Login successful', response.status)
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = async () => {
        const url = 'https://frontend-take-home-service.fetch.com/auth/logout'
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            console.log('Logout successful', response.status)
            setIsAuthenticated(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    if (loading) {
        return <LoadingPawPrints />
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
