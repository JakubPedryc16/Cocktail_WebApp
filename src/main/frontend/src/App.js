import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Views/LoginPage';
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import SearchPage from "./Views/SearchPage";
import ProfilePage from "./Views/ProfilePage";
import AddCocktailPage from "./Views/AddCocktailPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addcocktail" element={<AddCocktailPage />} />
            </Routes>
        </Router>
    );
}

export default App;