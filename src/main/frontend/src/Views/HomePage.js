import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Complex/Navbar';
import Logo from '../logo.png';
import MyButton from "../components/Basic/MyButton";
import EmptyWindow from '../components/Basic/EmptyWindow'
import { goToHome, goToSearch } from '../navigation/GoToNav'

const WindowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 90vh;
`;

const LogoImage = styled.img`
    width: 500px;
    height: auto;
    margin-right: 200px;
`;

const WelcomeMessage = styled.h1`
    color: rgba(255, 255, 255, 0.75);
    font-size: 32px;
    margin-left: 700px;
`;

function HomePage() {
    return (
        <>
            <Navbar />
            <WindowContainer>
                <WelcomeMessage>Welcome back!</WelcomeMessage>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LogoImage src={Logo} alt="Logo" />
                    <EmptyWindow>
                        <MyButton onClick = {goToSearch} >Search Cocktails </MyButton>
                        <MyButton onClick = {goToHome} >Create Cocktail </MyButton>
                        <MyButton onClick = {goToHome} >Find Me A Cocktail </MyButton>
                    </EmptyWindow>
                </div>

            </WindowContainer>
        </>
    );
}

export default HomePage;
