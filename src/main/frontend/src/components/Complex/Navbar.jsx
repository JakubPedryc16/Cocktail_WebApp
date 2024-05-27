import React from 'react';
import styled from 'styled-components';
import MyButton from "../Basic/MyButton";
import {
    goToHome,
    goToSearch,
    goToProfile,
    goToAddCocktail,
    goToDeleteCocktail,
    goToAddIngredient, goToDeleteIngredient
} from '../../navigation/GoToNav';

const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('token');
    window.location.href = "/login";
};

const Navbar = () => {

    const role = localStorage.getItem('role');
    return (
        <NavbarContainer>
            <Logo>Drunked</Logo>
            <NavButtons>
                {role === 'ADMIN' && <AdminNavButton onClick={() => goToDeleteIngredient()}>Delete Ingredient</AdminNavButton>}
                {role === 'ADMIN' && <AdminNavButton onClick={() => goToAddIngredient()}>Add Ingredient</AdminNavButton>}
                <NavButton onClick={goToHome}>Home</NavButton>
                <NavButton onClick={goToSearch}>Cocktails</NavButton>
                <NavButton onClick={goToProfile}>Profile</NavButton>
                <NavButton onClick={handleLogout}>Logout</NavButton>

            </NavButtons>
        </NavbarContainer>
    );
}

export default Navbar;


const NavbarContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    background-color: rgb(0, 130, 120);
    color: white;
    width: 100vw;

    @media (max-width: 750px){
        padding: 5px 10px;
        
    }
`;

const Logo = styled.div`
    font-size: 24px;
    margin: 5px;
    @media (max-width: 750px){
        font-size: 15px;
    }
`;

const NavButtons = styled.div`
    display: flex;
    margin: 0 10px;
    gap: 20px;
    @media (max-width: 768px) {
        gap:5px;
    }
`;

const NavButton = styled.div`
    padding: 10px 20px;
    color: white;
    font-size: 16px;
    background-color: rgb(30, 30, 36);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #48484b;
    }
    
    @media (max-width: 750px){
        padding: 5px 10px;
        font-size: 12px;
    }
`;
const AdminNavButton = styled(NavButton)`
    background-color: rgb(60, 30, 36);
`
