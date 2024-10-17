import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        medicalHistory: '',
        allergies: '',
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match. Please try again.');
            return;
        }
        try {
            // Send the entire formData Flask backend for registration
            await axios.post('http://127.0.0.1:5000/register', formData);
            setMessage('Registration successful! Please log in.');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Medical History</label>
                    <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter any relevant medical history or pre-existing conditions"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Allergies</label>
                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="List any known allergies"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
                >
                    Register
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            <p className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-cyan-600 hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;