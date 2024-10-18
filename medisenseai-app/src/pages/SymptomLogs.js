
const SymptomLogs = () => {
    
    const symptomsData = [
        { symptom: 'Headache', date: '2024-10-01', diagnosis: 'Possible tension headache or migraine' },
        { symptom: 'Fever', date: '2024-10-05', diagnosis: 'Possible viral infection or flu' },
        { symptom: 'Cough', date: '2024-10-08', diagnosis: 'Possible respiratory infection' },
        { symptom: 'Stomach pain', date: '2024-10-10', diagnosis: 'Possible gastritis or food poisoning' },
        { symptom: 'Dizziness', date: '2024-10-12', diagnosis: 'Possible low blood pressure or dehydration' },
        { symptom: 'Sore throat', date: '2024-10-14', diagnosis: 'Possible throat infection or cold' },
        { symptom: 'Fatigue', date: '2024-10-16', diagnosis: 'Possible lack of sleep or anemia' },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Symptom Logs</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">Symptom</th>
                        <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">Date</th>
                        <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">Possible Diagnosis</th>
                    </tr>
                </thead>
                <tbody>
                    {symptomsData.map((log, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-700">{log.symptom}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{log.date}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{log.diagnosis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SymptomLogs;