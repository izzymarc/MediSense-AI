import React, { useState } from 'react';

const SymptomCheck = () => {
    const [symptomInput, setSymptomInput] = useState('');
    const [diagnosisResult, setDiagnosisResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call to get the diagnosis result
        const response = await fetch('/check-symptoms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symptoms: symptomInput }),
        });
        const data = await response.json();
        setDiagnosisResult(data.advice || 'Could not fetch diagnosis. Please try again.');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl ml-12">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Hello Ezekiel! What would you like to find out today?
                </h2>

                {/* Diagnosis Result */}
                {diagnosisResult && (
                    <div className="bg-cyan-100 text-cyan-800 p-4 mb-4 rounded-md shadow-inner">
                        <h3 className="font-semibold mb-2">Possible Diagnosis:</h3>
                        <p>{diagnosisResult}</p>
                    </div>
                )}

                {/* Symptom Search Form */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Enter your symptom..."
                        value={symptomInput}
                        onChange={(e) => setSymptomInput(e.target.value)}
                        className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full max-w-xs py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
                    >
                        Check Symptoms
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SymptomCheck;