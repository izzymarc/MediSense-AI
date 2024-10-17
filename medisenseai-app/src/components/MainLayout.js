import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SymptomCheck from '../pages/SymptomCheck';
import SymptomLogs from '../pages/SymptomLogs';

const MainLayout = () => {
    const location = useLocation();

    const hideHeader = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/symptom-check" element={<SymptomCheck />} />
                <Route path="/logs" element={<SymptomLogs />} />
            </Routes>
        </>
    );
};

export default MainLayout;