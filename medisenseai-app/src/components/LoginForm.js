import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            
            if (response.data.success) {
                // Redirect or handle successful login
                setMessage('Login successful!');
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;