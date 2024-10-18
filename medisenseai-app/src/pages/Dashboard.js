import React, { useEffect, useRef } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register the necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement 
);


const Dashboard = () => {
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);

    // Clean up the chart instances on component unmount
    useEffect(() => {
        const lineChartInstance = lineChartRef.current;
        const pieChartInstance = pieChartRef.current;

        return () => {
            if (lineChartInstance) {
                lineChartInstance.destroy();
            }
            if (pieChartInstance) {
                pieChartInstance.destroy();
            }
        };
    }, []);

    const lineChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Symptom Frequency',
                data: [12, 19, 8, 15, 10],
                fill: false,
                borderColor: 'rgba(0, 188, 212, 1)',
                tension: 0.1,
            },
            {
                label: 'Improvement Rate',
                data: [8, 12, 6, 10, 7],
                fill: false,
                borderColor: 'rgba(0, 150, 136, 1)',
                tension: 0.1,
            },
        ],
    };

    const pieChartData = {
        labels: ['Headache', 'Fever', 'Cough'],
        datasets: [
            {
                data: [12, 8, 5],
                backgroundColor: ['#00bcd4', '#009688', '#80deea'],
                hoverBackgroundColor: ['#00acc1', '#00897b', '#4dd0e1'],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 h-full">
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Popular Symptoms */}
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-xl font-semibold text-cyan-700 mb-2">Popular Symptoms</h3>
                    <p className="text-4xl font-bold text-cyan-600">3</p>
                </div>

                {/* Total Diagnoses */}
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-xl font-semibold text-cyan-700 mb-2">Total Diagnoses</h3>
                    <p className="text-4xl font-bold text-cyan-600">34</p>
                </div>

                {/* Symptom Improvement */}
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-xl font-semibold text-cyan-700 mb-2">Symptom Improvement</h3>
                    <p className="text-4xl font-bold text-cyan-600">72%</p>
                </div>
            </div>

            {/* Symptom Tracker Pie Chart */}
            <div className="bg-white shadow-lg rounded p-6 mb-8" style={{ width: '100%', height: '550px' }}>
                <h3 className="text-2xl font-semibold text-cyan-700 mb-4">Symptom Tracker</h3>
                <Pie ref={pieChartRef} data={pieChartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Top 3 Most Common Symptoms',
                        },
                    },
                }} />
            </div>

            {/* Health Insights Line Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-cyan-700 mb-4">Health Insights</h3>
                <Line
                    ref={lineChartRef}
                    data={lineChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Frequency of Symptoms vs Improvement Rate',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
