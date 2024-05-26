import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Navbar from '../components/Complex/Navbar';
import Logo from '../logo.png';
import {goToAddCocktail, goToDeleteCocktail, goToLogin, goToSearch} from "../navigation/GoToNav";
import ImageButton from "../components/Basic/ImageButton";
import axios from "axios";


const WindowContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 90vh;
`;

const LogoImage = styled.img`
    width: 600px;
    height: auto;
    position: fixed;
    top: 50%;
    left: 200px;
    transform: translate(0, -50%);
    z-index: 1;
`;

const ContentContainer = styled.div`
    margin-top: 50px;
    margin-right: 200px; 
    z-index: 0;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-left: 1000px;
`;

const WelcomeMessage = styled.h1`
    color: rgba(255, 255, 255, 0.75);
    font-size: 32px;
    text-align: center;
`;

function HomePage() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            goToLogin();
        }
    }, []);

    return (
        <>
            <Navbar />
            <WindowContainer>
                <LogoImage src={Logo} alt="Logo" />
                <ContentContainer>
                    <StyledButtonContainer>
                        <WelcomeMessage>Welcome to the Drunked</WelcomeMessage>
                        <ImageButton
                            imageSrc="/test_cocktail_1.jpg"
                            altText="Nazwa obrazu 1"
                            buttonText="Search Cocktails"
                            onClick={goToSearch}
                        />

                        <ImageButton
                            imageSrc="/test_cocktail_1.jpg"
                            altText="Nazwa obrazu 2"
                            buttonText="Add Cocktail"
                            onClick={goToAddCocktail}
                        />

                        <ImageButton
                            imageSrc="/test_cocktail_1.jpg"
                            altText="Nazwa obrazu 3"
                            buttonText="Delete Cocktails"
                            onClick={goToDeleteCocktail}
                        />
                    </StyledButtonContainer>
                </ContentContainer>
            </WindowContainer>
        </>
    );
}

export default HomePage;
