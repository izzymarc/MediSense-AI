import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        // Clear any user authentication state or tokens here
        console.log("Logged out");
        // Redirect to login page after logout
        navigate('/login');
    };

    const handleProfileUpdate = () => {
        // Redirect to profile update page or show modal
        console.log("Update profile");
    };

    return (
        <div className="bg-white shadow-md p-4 flex justify-end items-center">
            <div className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    <FaUserCircle size={30} />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <ul>
                            <li onClick={handleProfileUpdate} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile Update</li>
                            <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopNav;