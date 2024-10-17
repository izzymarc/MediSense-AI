
const SideNav = () => {
    return (
        <aside className="w-64 bg-cyan-800 text-white h-full fixed flex flex-col items-center py-6">
            <div className="text-2xl font-bold mb-8">MediSense AI</div>
            <nav className="flex flex-col space-y-4 w-full px-4">
                <a href="/portal/dashboard" className="py-2 px-3 rounded hover:bg-cyan-600">Dashboard</a>
                <a href="/portal/symptom-logs" className="py-2 px-3 rounded hover:bg-cyan-600">Medical History</a>
                <a href="/portal/symptom-check" className="py-2 px-3 rounded hover:bg-cyan-600">Symptom Checker</a>
            </nav>
        </aside>
    );
};

export default SideNav;