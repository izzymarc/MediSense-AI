import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Portal from './Portal';

// Imported Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SymptomCheck from '../pages/SymptomCheck';
import SymptomLogs from '../pages/SymptomLogs';
import Dashboard from '../pages/Dashboard' ;
import UserProfile from '../pages/UserProfile';


const MainLayout = () => {
    const location = useLocation();

    const hideHeader = location.pathname === '/login' || location.pathname === '/register'  || location.pathname=== '/portal'  ||  location.pathname === '/portal/symptom-check'  ||  location.pathname === '/portal/symptom-logs'  ||  location.pathname === '/portal/dashboard'  || location.pathname === '/portal/account'  ||  location.pathname.startsWith === '/portal';

    return (
        <>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/symptom-check" element={<SymptomCheck />} />
                <Route path="/logs" element={<SymptomLogs />} /> */}
                <Route path="/portal/*" element={<Portal />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="symptom-logs" element={<SymptomLogs />} />
                    <Route path="symptom-check" element={<SymptomCheck />} />
                    <Route path="account" element={<UserProfile />} />
                </Route>
            </Routes>
        </>
    );
};

export default MainLayout;