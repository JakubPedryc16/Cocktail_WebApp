import React from 'react';
import styled from 'styled-components';
import MyButton from "../Basic/MyButton";
import {
    goToHome,
    goToSearch,
    goToProfile,
    goToAddCocktail,
    goToDeleteCocktail,
    goToAddIngredient
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
                {role === 'ADMIN' && <AdminNavButton onClick={() => goToAddIngredient()}>Add Ingredient</AdminNavButton>}
                <NavButton onClick={goToHome}>Home</NavButton>
                <NavButton onClick={goToSearch}>Cocktails</NavButton>
                <NavButton onClick={goToProfile}>Profile</NavButton>
                <NavButton onClick={goToAddCocktail}>Add Cocktail</NavButton>
                <NavButton onClick={goToDeleteCocktail}>Manage Cocktails</NavButton>
                <NavButton onClick={handleLogout}>Logout</NavButton>

            </NavButtons>
        </NavbarContainer>
    );
}

const NavbarContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: rgb(0, 130, 120);
    color: white;
`;

const Logo = styled.div`
    font-size: 24px;
`;

const NavButtons = styled.div`
    display: flex;
    gap: 20px;
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
`;
const AdminNavButton = styled(NavButton)`
    background-color: rgb(60, 30, 36);
    padding: 10px 20px;
`

export default Navbar;
