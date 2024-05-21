import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Views/LoginPage';
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import SearchPage from "./Views/SearchPage";
import ProfilePage from "./Views/ProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App; // Eksportuj komponent App jako domyślny eksport
