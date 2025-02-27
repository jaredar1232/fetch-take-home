import { useNavigate } from 'react-router-dom'
import DogImage from '../assets/dog4.svg'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                    Page not found
                </h1>
                <div className="flex items-center justify-center pt-20">
                    <img
                        src={DogImage}
                        alt="No favorites"
                        className="h-auto w-64"
                    />
                </div>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        onClick={() => navigate('/')}
                        className="cursor-pointer rounded-md bg-blue-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </a>
                    <a
                        href="https://www.jaredar.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900"
                    >
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </main>
    )
}
