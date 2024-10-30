
// const SymptomLogs = () => {
    
//     const symptomsData = [
//         { symptom: 'Headache', date: '2024-10-01', diagnosis: 'Possible tension headache or migraine' },
//         { symptom: 'Fever', date: '2024-10-05', diagnosis: 'Possible viral infection or flu' },
//         { symptom: 'Cough', date: '2024-10-08', diagnosis: 'Possible respiratory infection' },
//         { symptom: 'Stomach pain', date: '2024-10-10', diagnosis: 'Possible gastritis or food poisoning' },
//         { symptom: 'Dizziness', date: '2024-10-12', diagnosis: 'Possible low blood pressure or dehydration' },
//         { symptom: 'Sore throat', date: '2024-10-14', diagnosis: 'Possible throat infection or cold' },
//         { symptom: 'Fatigue', date: '2024-10-16', diagnosis: 'Possible lack of sleep or anemia' },
//     ];

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Symptom Logs</h2>
//             <table className="min-w-full bg-white">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">Symptom</th>
//                         <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">Date</th>
//                         <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">Possible Diagnosis</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {symptomsData.map((log, index) => (
//                         <tr key={index} className="border-b border-gray-200">
//                             <td className="px-4 py-2 text-sm text-gray-700">{log.symptom}</td>
//                             <td className="px-4 py-2 text-sm text-gray-700">{log.date}</td>
//                             <td className="px-4 py-2 text-sm text-gray-700">{log.diagnosis}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default SymptomLogs;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicalHistory = () => {
    const [historyData, setHistoryData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                const response = await axios.get('/view-logs', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setHistoryData(response.data);
            } catch (err) {
                setError('Failed to fetch medical history data.');
                console.error(err);
            }
        };

        fetchMedicalHistory();
    }, []);

    return (
        <div className="medical-history">
            <h2 className="text-xl font-bold mb-4">Medical History</h2>
            {error && <p className="text-red-600">{error}</p>}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Symptom</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Possible Cause</th>
                        <th className="border px-4 py-2">Recommendation</th>
                        <th className="border px-4 py-2">Lifestyle Change</th>
                        <th className="border px-4 py-2">Medication</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((record, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{record.symptoms.join(', ')}</td>
                            <td className="border px-4 py-2">{record.date}</td>
                            <td className="border px-4 py-2">{record.possible_cause}</td>
                            <td className="border px-4 py-2">{record.recommendation}</td>
                            <td className="border px-4 py-2">{record.lifestyle_change}</td>
                            <td className="border px-4 py-2">{record.medication}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalHistory;
