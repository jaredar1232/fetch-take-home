import { useState } from 'react'
import TextInput from '../components/TextInput'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import DogImage from '../assets/dog.svg'

export default function LoginPage() {
    const { login } = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setError('')
        setIsLoading(true)
        try {
            await login(name, email)
            navigate('/')
        } catch (err) {
            setError('Failed to login. Please check your credentials.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-blue-100">
            <div className="pt-20">
                <img src={DogImage} alt="Dog" className="h-auto w-64" />
            </div>
            <div className="flex w-full justify-center pt-10">
                <div className="w-full max-w-md divide-y divide-gray-200 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-center text-lg font-semibold">
                        Please enter your information to browse our Dogs!
                    </h2>
                    {error && (
                        <div className="mb-4 text-center text-red-500">
                            {error}
                        </div>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        className="space-y-4"
                    >
                        <TextInput
                            field="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextInput
                            field="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex justify-center pt-5">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`cursor-pointer rounded-md bg-gradient-to-b from-blue-800 to-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white drop-shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-300'}`}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
