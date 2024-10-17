import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SymptomCheck from './pages/SymptomCheck';
import SymptomLogs from './pages/SymptomLogs';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/symptom-check" element={<SymptomCheck />} />
                <Route path="/logs" element={<SymptomLogs />} />
            </Routes>
        </Router>
    );
}

export default App;