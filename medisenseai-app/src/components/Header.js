import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-80% bg-transparent m-12 py-4 px-8 flex items-center justify-between border border-gray-500 rounded-lg top-0 z-10">
            {/* Logo Section */}
            <div className="text-black font-bold text-xl">MediSense AI</div>

            {/* Navigation Links */}
            <nav className="flex space-x-8 text-black text-sm">
                <Link to="/about" className="hover:text-cyan-500 transition">About Us</Link>
                <Link to="/ai-test" className="hover:text-cyan-500 transition">AI Test</Link>
                <Link to="/contact" className="hover:text-cyan-500 transition">Contact Us</Link>
            </nav>

            {/* CTA Button */}
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="bg-gray-600 text-white py-2 px-6 rounded-full font-bold shadow-md hover:bg-gray-500 transition"
                >
                    Log In
                </Link>
                <Link
                    to="/register"
                    className="bg-cyan-600 text-white py-2 px-6 rounded-full font-bold shadow-md hover:bg-cyan-500 transition"
                >
                    Sign Up
                </Link>
                
            </div>
        </header>
    );
};

export default Header;
