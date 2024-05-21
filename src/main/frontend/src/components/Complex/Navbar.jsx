import React from 'react';
import styled from 'styled-components';
import MyButton from "../Basic/MyButton";
import { goToHome, goToSearch, goToAboutMe } from '../../navigation/GoToNav'

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
                    <MyButton onClick={goToHome}>Home</MyButton>
                    <MyButton onClick={goToSearch}>Cocktails</MyButton>
                    <MyButton onClick={goToAboutMe}>>About Cocktailoo</MyButton>
                    <MyButton onClick={handleLogout}>Logout</MyButton>
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
    width: 10vw;
`;


export default Navbar;

