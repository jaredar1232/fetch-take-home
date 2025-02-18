import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (dog) => {
        // Prevent duplicates
        setFavorites((prev) =>
            prev.find((fav) => fav.id === dog.id) ? prev : [...prev, dog]
        );
    };

    const removeFavorite = (dogId) => {
        setFavorites((prev) => prev.filter((dog) => dog.id !== dogId));
    };

    const clearFavorites = () => {
        setFavorites([])
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}