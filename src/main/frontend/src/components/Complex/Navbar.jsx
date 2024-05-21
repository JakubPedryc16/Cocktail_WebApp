import React from 'react';
import styled from 'styled-components';
import MyButton from "../Basic/MyButton";
import { goToHome, goToSearch, goToProfile } from '../../navigation/GoToNav'

const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('token');
    window.location.href = "/login";
};
function Navbar() {
    return (
        <NavbarContainer>
            <Logo>Cocktailoo</Logo>
                <NavButtons>
                    <NavButton onClick={goToHome}>Home</NavButton>
                    <NavButton onClick={goToSearch}>Cocktails</NavButton>
                    <NavButton onClick={goToProfile}>Profile</NavButton>
                    <NavButton onClick={handleLogout}>Logout</NavButton>
                </NavButtons>
        </NavbarContainer>
    );
}

const NavbarContainer = styled.div`
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

const NavButtons = styled.a`
    display: flex;
    margin-left: 20px;
    text-decoration: none;
    color: white;
    cursor: pointer;
    width: 30vw;
`;

const NavButton = styled.div`

    margin-left: 20px;
    color: white;
    display: block;
    text-align: center;
    width: 6vw;
    height: 3vh;
    font-size: 16px;
    background-color: rgb(36, 35, 51);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-content: center;

    &:hover {
        background-color: #48484b;
    }
`;


export default Navbar;

