import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DogCard from "../components/DogCard";
import FilterSortBar from "../components/FilterSortBar";
import DogImage from "../assets/dog2.svg";
import SizeDropdown from "../components/SizeDropdown";
import LoadingPawPrints from "../components/LoadingPawPrints";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

export default function HomePage() {
    const [dogData, setDogData] = useState([]);
    const [nextPageQuery, setNextPageQuery] = useState(null);
    const [prevPageQuery, setPrevPageQuery] = useState(null);
    const [curPageQuery, setCurPageQuery] = useState("/dogs/search?sort=breed:asc&size=9"); // Default query with sort and size

    // Filter states
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [sortOption, setSortOption] = useState("breed:asc");
    const [size, setSize] = useState(9);
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(14);
    const [zipCode, setZipCode] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Rebuild the query string every time a filter value changes
    useEffect(() => {
        const params = new URLSearchParams();
        selectedBreeds.forEach((breed) => params.append("breeds", breed));
        params.set("sort", sortOption);
        params.set("size", size);
        params.set("ageMin", minAge);
        params.set("ageMax", maxAge);
        // Only include the zip code if it's either empty (no filter) or a full zipcode (exactly 5)
        if (zipCode.trim() !== "" && zipCode.trim().length === 5) {
            params.append("zipCodes", zipCode);
        }
        setCurPageQuery(`/dogs/search?${params.toString()}`);
        setCurrentPage(1);
    }, [selectedBreeds, sortOption, size, minAge, maxAge, zipCode]);

    // Fetch dog data when the query changes
    useEffect(() => {
        async function fetchDogData() {
            setIsLoading(true);
            setError(null);
            try {
                const idResponse = await fetch(`${BASE_URL}${curPageQuery}`, {
                    credentials: "include",
                });
                if (idResponse.status === 401) {
                    navigate("/login");
                    return;
                }
                if (!idResponse.ok)
                    throw new Error(`ID fetch failed: ${idResponse.status}`);
                const idJson = await idResponse.json();
                setNextPageQuery(idJson.next || null);
                setPrevPageQuery(idJson.prev || null);

                if (!idJson.resultIds?.length) {
                    setDogData([]);
                } else {
                    const dataResponse = await fetch(`${BASE_URL}/dogs`, {
                        credentials: "include",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(idJson.resultIds),
                    });
                    if (!dataResponse.ok)
                        throw new Error(`Data fetch failed: ${dataResponse.status}`);
                    const dataJson = await dataResponse.json();
                    setDogData(dataJson);
                }
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDogData();
    }, [curPageQuery, navigate]);

    return (
        <div className="bg-gradient-to-l from-blue-200 to-gray-100 pt-44 pb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between pb-10">
                    <div className="flex-grow">
                        <h1 className="text-6xl font-semibold tracking-tight text-pretty text-gray-900">
                            Step 1
                        </h1>
                        <h2 className="text-4xl tracking-tight text-pretty text-gray-900 pt-5">
                            Heart your favorite dogs! Use sorting and filters to find your perfect friend!
                        </h2>
                    </div>
                    <div className="mt-5 lg:mt-0 lg:ml-4">
                        <img src={DogImage} alt="Dog" className="w-64 h-auto" />
                    </div>
                </div>

                <div className="py-5">
                    <FilterSortBar
                        selectedBreeds={selectedBreeds}
                        setSelectedBreeds={setSelectedBreeds}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        zipCode={zipCode}
                        setZipCode={setZipCode}
                        minAge={minAge}
                        setMinAge={setMinAge}
                        maxAge={maxAge}
                        setMaxAge={setMaxAge}
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-center mb-4">{error}</div>
                )}

                {isLoading ? (
                    <div className="pt-10 pb-30">
                        <LoadingPawPrints />
                    </div>
                ) : (
                    <ul
                        role="list"
                        className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                    >
                        {dogData.map((dog) => (
                            <DogCard dog={dog} key={dog.id} />
                        ))}
                    </ul>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 items-center pt-20">
                    <div className="flex justify-center sm:justify-start">
                        <SizeDropdown size={size} setSize={setSize} />
                    </div>

                    <div className="flex flex-col items-center my-4 sm:my-0">
                        <div className="flex justify-center space-x-10">
                            <button
                                type="button"
                                onClick={() => {
                                    setCurPageQuery(prevPageQuery);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
                                }}
                                disabled={!prevPageQuery}
                                className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-blue-800 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:from-blue-500 hover:to-blue-300 focus:outline-none disabled:from-gray-600 disabled:to-gray-400"
                            >
                                Prev
                            </button>
                            <div className="text-lg text-gray-700 pt-2">Page {currentPage}</div>
                            <button
                                type="button"
                                onClick={() => {
                                    setCurPageQuery(nextPageQuery);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                    setCurrentPage((prev) => prev + 1);
                                }}
                                disabled={!nextPageQuery}
                                className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-blue-800 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:from-blue-500 hover:to-blue-300 focus:outline-none disabled:from-gray-600 disabled:to-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center sm:justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                navigate("favorites");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:from-purple-500 hover:to-purple-300 focus:outline-none"
                        >
                            Step 2
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}