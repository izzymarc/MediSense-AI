
import { FaHeartbeat, FaTachometerAlt, FaBookMedical, FaStethoscope } from 'react-icons/fa';

const SideNav = () => {
    return (
        <aside className="w-64 bg-white text-white h-full fixed flex flex-col items-center py-6 shadow-sm">
            <div className="flex items-center text-xl font-bold mb-8 text-cyan-800">
                <FaHeartbeat className="mr-2" />
                MediSense AI
            </div>

            {/* Navigation list with icons */}
            <nav className="flex flex-col space-y-4 w-full px-4 text-sm text-gray-700">
                <a href="/portal/dashboard" className="flex items-center py-2 px-3 rounded hover:bg-cyan-600 hover:text-cyan-800">
                    <FaTachometerAlt className="mr-2" />
                    Dashboard
                </a>
                <a href="/portal/symptom-logs" className="flex items-center py-2 px-3 rounded hover:bg-cyan-600 hover:text-cyan-800">
                    <FaBookMedical className="mr-2" />
                    Medical History
                </a>
                <a href="/portal/symptom-check" className="flex items-center py-2 px-3 rounded hover:bg-cyan-600 hover:text-cyan-800">
                    <FaStethoscope className="mr-2" />
                    Symptom Checker
                </a>
            </nav>
        </aside>
    );
};

export default SideNav;
