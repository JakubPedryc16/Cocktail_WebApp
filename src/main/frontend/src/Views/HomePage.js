import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Logo from '../logo.png';
import MyButton from "../components/MyButton";
import EmptyWindow from '../components/EmptyWindow'

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
                        <MyButton>Search Cocktails</MyButton>
                        <MyButton>Create Cocktail</MyButton>
                        <MyButton>Find Me A Cocktail</MyButton>
                    </EmptyWindow>
                </div>

            </WindowContainer>
        </>
    );
}

export default HomePage;
