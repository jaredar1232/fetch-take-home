export default function EmptyFavorites({ navigate, dogImage }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-blue-200 to-gray-100 px-4 py-44">
            <img src={dogImage} alt="No favorites" className="h-auto w-64" />
            <h2 className="py-5 text-2xl tracking-tight text-pretty text-gray-600">
                Try favoriting some dogs on the explore page!
            </h2>
            <button
                type="button"
                onClick={() => navigate('/')}
                className="cursor-pointer rounded-md bg-gradient-to-b from-purple-800 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white drop-shadow-lg hover:bg-gradient-to-b hover:from-purple-500 hover:to-purple-300 focus:outline-none"
            >
                Step 1
            </button>
        </div>
    )
}
