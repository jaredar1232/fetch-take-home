import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import DogCard from '../components/DogCard';
import dogImage from "../assets/dog5.svg";
import { useNavigate } from 'react-router-dom';
import EmptyFavorites from "../components/EmptyFavorites";

function MatchResult({ matchedDog, clearFavorites, navigate }) {
    return (
        <div className="bg-gradient-to-b from-blue-200 to-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-6xl font-semibold tracking-tight text-pretty text-gray-800 mb-6">
                Your Match
            </h1>
            <div className="mb-10">
                <DogCard dog={matchedDog} />
            </div>
            <button
                type="button"
                onClick={() => {
                    clearFavorites();
                    navigate("/");
                }}
                className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-b hover:from-purple-500 hover:to-purple-300 focus:outline-none"
            >
                Start Over
            </button>
        </div>
    );
}

function InitialMatchUI({ handleGetMatch, error }) {
    return (
        <div className="bg-gradient-to-b from-blue-200 to-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-6xl font-semibold text-gray-900">Step 3</h1>
            <h2 className="text-4xl tracking-tight text-pretty text-gray-700 sm:text-2xl mt-4">
                Find your perfect match from your favorites list!
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
                Our advanced AI algorithm compares multiple traits to pair you with your perfect pet.
            </p>
            <img src={dogImage} alt="Illustration" className="w-64 h-auto pt-20" />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
                onClick={handleGetMatch}
                className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-blue-800 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-300 focus:outline-none"
            >
                Get Match
            </button>
        </div>
    );
}

export default function GetAMatchPage() {
    const { favorites, clearFavorites } = useFavorites();
    const [matchedDog, setMatchedDog] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleGetMatch = async () => {
        if (favorites.length === 0) {
            setError("No favorites available to match!");
            return;
        }
        const dogIDs = favorites.map(dog => dog.id);
        try {
            const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dogIDs),
            });
            if (response.status === 401) {
                navigate("/login");
                return;
            }
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json(); // data: { match: "dogId" }
            const matchID = data.match;
            const dog = favorites.find(d => d.id === matchID);
            setMatchedDog(dog);
            setError(null);
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    if (favorites.length === 0) {
        return <EmptyFavorites navigate={navigate} dogImage={dogImage} />;
    }

    if (matchedDog) {
        return <MatchResult matchedDog={matchedDog} clearFavorites={clearFavorites} navigate={navigate} />;
    }

    return <InitialMatchUI handleGetMatch={handleGetMatch} error={error} />;
}