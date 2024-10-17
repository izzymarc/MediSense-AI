import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="flex h-screen">
            {/* Left Section with Image and Text */}
            <div className="w-1/2 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 flex flex-col justify-center items-center text-white p-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to MediSense AI</h1>
                <p className="text-lg">Your personalized medical assistant.</p>
                <p className="text-lg">Track symptoms, get tailored advice, and manage your health better!</p>
            </div>

            {/* Right Section with the Registration Form */}
            <div className="w-1/2 flex justify-center items-center p-8">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;