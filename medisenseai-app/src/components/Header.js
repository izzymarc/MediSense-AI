import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">MediSense</h1>
                <nav>
                    {/* <Link to="/" className="mr-4">Home</Link> */}
                    <Link to="/symptom-check">Check Symptoms</Link>
                    {/* <Link to="/logs" className="ml-4">View Logs</Link> */}
                    <Link to="/login" className="ml-4">Login</Link>
                    <Link to="/register" className="ml-4">Register</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
