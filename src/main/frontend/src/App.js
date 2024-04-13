import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Views/LoginPage';
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import SearchPage from "./Views/SearchPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/searchPage" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App; // Eksportuj komponent App jako domyślny eksport
