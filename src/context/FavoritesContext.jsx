import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
    // Initialize favorites from local if available
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites')
        return storedFavorites ? JSON.parse(storedFavorites) : []
    })

    // Persist favorites on change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (dog) => {
        // Prevent duplicates
        setFavorites((prev) =>
            prev.find((fav) => fav.id === dog.id) ? prev : [...prev, dog]
        )
    }

    const removeFavorite = (dogId) => {
        setFavorites((prev) => prev.filter((dog) => dog.id !== dogId))
    }

    const clearFavorites = () => {
        setFavorites([])
    }

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    return useContext(FavoritesContext)
}