import { useFavorites } from "../context/FavoritesContext";
import DogCard from "../components/DogCard";
import DogImage from "../assets/dog3.svg";
import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function EmptyFavorites({ navigate }) {
    return (
        <div className="bg-gradient-to-tr from-blue-200 to-gray-100 py-44 min-h-screen flex flex-col items-center justify-center px-4">
            <img src={DogImage} alt="No favorites" className="w-64 h-auto" />
            <p className="mt-4 text-lg text-gray-600 text-center">
                Try favoriting some dogs on the explore page!
            </p>
            <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-6 drop-shadow-lg rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-b hover:from-purple-500 hover:to-purple-300 focus:outline-none"
            >
                Step 1
            </button>
        </div>
    );
}

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavorites();
    const navigate = useNavigate();

    if (!favorites?.length) {
        return <EmptyFavorites navigate={navigate} />;
    }

    return (
        <div className="bg-gradient-to-tr from-blue-200 to-gray-100 py-44 min-h-screen pb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h1 className="text-6xl font-semibold text-gray-900 text-right">Step 2</h1>
                <div className="flex flex-col sm:flex-row items-center justify-between py-4">

                    <button
                        onClick={clearFavorites}
                        className="cursor-pointer flex items-center gap-2 drop-shadow-lg rounded-md bg-gradient-to-b from-blue-800 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-300 focus:outline-none"
                    >
                        <span>Clear Favorites</span>
                        <ArrowPathIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>

                    <h2 className="mt-4 sm:mt-0 text-2xl tracking-tight text-pretty text-gray-600 text-center">
                        Review your favorites list by comparing your top picks side by side!
                    </h2>
                </div>

                <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((dog) => (
                        <DogCard key={dog.id} dog={dog} />
                    ))}
                </ul>

                <div className="flex justify-end pr-5 pt-5">
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/get-a-match");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-b hover:from-purple-500 hover:to-purple-300 focus:outline-none"
                    >
                        Step 3
                    </button>
                </div>
            </div>
        </div>
    );
}