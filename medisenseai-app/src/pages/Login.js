import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <div className="w-1/2 bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 flex flex-col justify-center items-center text-white p-8">
                <div className="max-w-md text-center">
                    <h1 className="text-5xl font-bold mb-4">MediSense AI</h1>
                    <p className="text-lg mb-6">
                        Discover the power of AI-driven symptom checking. Get instant insights, medical advice, and more.
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
                <div className="max-w-sm w-full">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
