import { useFavorites } from '../context/FavoritesContext';

function FavoriteIcon({ isFavorited, onClick }) {
    return (
        <button onClick={onClick} className="cursor-pointer focus:outline-none">
            {isFavorited ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            )}
        </button>
    );
}

function InfoPill({ label, value }) {
    return (
        <li className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
            {label}: {value}
        </li>
    );
}

export default function DogCard({ dog }) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    if (!dog) return null;
    const isFavorited = favorites.some((fav) => fav.id === dog.id);

    const toggleFavorite = () => {
        try {
            if (isFavorited) {
                removeFavorite(dog.id);
            } else {
                addFavorite(dog);
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    return (
        <li key={dog.id} className="overflow-hidden rounded-3xl bg-white shadow-sm list-none mb-4">
            <div className="px-4 py-5 sm:p-6">
                <img
                    alt={dog.name || 'Dog image'}
                    src={dog.img || '/fallback-image.jpg'}
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                />
                <div className="mt-4 inline-block bg-purple-100 px-3 py-1 rounded-full">
                    <h3 className="text-lg font-semibold tracking-tight text-gray-900">{dog.name}</h3>
                </div>
                <ul role="list" className="mt-6 flex flex-wrap gap-2">
                    <InfoPill label="Breed" value={dog.breed} />
                    <InfoPill label="Age" value={dog.age} />
                    <InfoPill label="Zip Code" value={dog.zip_code} />
                    <li>
                        <FavoriteIcon isFavorited={isFavorited} onClick={toggleFavorite} />
                    </li>
                </ul>
            </div>
        </li>
    );
}