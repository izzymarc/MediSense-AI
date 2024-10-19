import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loader

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            if (response.data.success) {
                // Redirect after a short delay to show loader
                setTimeout(() => {
                    navigate('/portal/dashboard');
                }, 1000); // 1 second delay for loader
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false); // Stop loader on error or success
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            <p className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <a href="/register" className="text-cyan-600 hover:underline">
                    Sign up
                </a>
            </p>
        </div>
    );
};

export default LoginForm;