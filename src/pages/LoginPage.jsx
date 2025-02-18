import { useState } from 'react';
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import DogImage from "../assets/dog.svg";

export default function LoginPage() {
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError('');
        setIsLoading(true);
        try {
            await login(name, email);
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center">
            <div className="pt-20">
                <img src={DogImage} alt="Dog" className="w-64 h-auto" />
            </div>
            <div className="pt-10 w-full flex justify-center">
                <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm w-full max-w-md p-6">
                    <h2 className="mb-4 text-lg font-semibold text-center">
                        Please enter your information to browse our Dogs!
                    </h2>
                    {error && (
                        <div className="mb-4 text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
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
                                className={`drop-shadow-lg rounded-md cursor-pointer bg-gradient-to-b from-blue-800 to-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-300'}`}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}