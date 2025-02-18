export default function EmptyFavorites({ navigate, dogImage }) {
    return (
        <div className="bg-gradient-to-tr from-blue-200 to-gray-100 py-44 min-h-screen flex flex-col items-center justify-center px-4">
            <img src={dogImage} alt="No favorites" className="w-64 h-auto" />
            <h2 className="text-2xl tracking-tight text-pretty text-gray-600 py-5">
                Try favoriting some dogs on the explore page!
            </h2>
            <button
                type="button"
                onClick={() => navigate("/")}
                className="cursor-pointer drop-shadow-lg rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-b hover:from-purple-500 hover:to-purple-300 focus:outline-none"
            >
                Step 1
            </button>
        </div>
    );
}