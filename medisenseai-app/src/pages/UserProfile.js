import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        gender: '',
        contact_number: '',
        medical_history: '',
        allergies: '',
        profile_image_url: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/profile', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                setProfileData(response.data);
                setPreviewImage(response.data.profile_image_url);
            } catch (err) {
                console.error('Failed to fetch profile data.');
            }
        };
        fetchProfileData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPreviewImage(URL.createObjectURL(file));
        setProfileData((prevData) => ({ ...prevData, profile_image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(profileData).forEach(([key, value]) => formData.append(key, value));
        
        try {
            await axios.put('/api/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsEditing(false);
            alert('Profile updated successfully');
        } catch (err) {
            console.error('Failed to update profile.');
        }
    };

    return (
        <div className="profile-page flex flex-col items-center p-8">

            {/* Profile Image Section */}
            <div className="relative mb-6 flex flex-col items-center">
                <div className="relative border-2 border-dashed border-blue-400 rounded-full p-1 hover:bg-blue-50">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200">
                            <FaUpload className="text-blue-400 text-3xl" />
                        </div>
                    )}

                    {/* Overlay with upload functionality */}
                    {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                            <label htmlFor="profileImageUpload" className="flex flex-col items-center">
                                <FaUpload className="text-white text-2xl mb-1" />
                                <span className="text-blue-400">Upload Image</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="profileImageUpload"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </div>
                    )}
                </div>
                {/* Placeholder text for upload, disappears when image is uploaded */}
                {!previewImage && <span className="text-blue-500 mt-2">Upload Image</span>}
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                {/* Editable Form Fields */}
                {['first_name', 'last_name', 'email', 'date_of_birth', 'gender', 'contact_number', 'medical_history', 'allergies'].map((field) => (
                    <div key={field}>
                        <label className="block text-gray-700 capitalize">{field.replace('_', ' ')}</label>
                        <input
                            type="text"
                            name={field}
                            value={profileData[field]}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-400' : 'border-transparent'}`}
                        />
                    </div>
                ))}

                {/* Update/Cancel Buttons */}
                {isEditing ? (
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full">Update</button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-full"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full"
                    >
                        Edit Profile
                    </button>
                )}
            </form>
        </div>
    );
};

export default Profile;

