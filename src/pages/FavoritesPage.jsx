import { useFavorites } from '../context/FavoritesContext'
import DogCard from '../components/DogCard'
import dogImage from '../assets/dog3.svg'
import { useNavigate } from 'react-router-dom'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import EmptyFavorites from '../components/EmptyFavorites'

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavorites()
    const navigate = useNavigate()

    if (!favorites?.length) {
        return <EmptyFavorites navigate={navigate} dogImage={dogImage} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-200 to-gray-100 py-44 pb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h1 className="text-right text-6xl font-semibold text-gray-900">
                    Step 2
                </h1>
                <div className="flex flex-col items-center justify-between py-4 sm:flex-row">
                    <button
                        onClick={clearFavorites}
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-blue-800 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white drop-shadow-lg hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-300 focus:outline-none"
                    >
                        <span>Clear Favorites</span>
                        <ArrowPathIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </button>

                    <h2 className="mt-4 text-center text-2xl tracking-tight text-pretty text-gray-600 sm:mt-0">
                        Review your favorites list by comparing your top picks
                        side by side!
                    </h2>
                </div>

                <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((dog) => (
                        <DogCard key={dog.id} dog={dog} />
                    ))}
                </ul>

                <div className="flex justify-end pt-5 pr-5">
                    <button
                        type="button"
                        onClick={() => {
                            navigate('/get-a-match')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="cursor-pointer rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white drop-shadow-lg hover:bg-gradient-to-b hover:from-purple-500 hover:to-purple-300 focus:outline-none"
                    >
                        Step 3
                    </button>
                </div>
            </div>
        </div>
    )
}
