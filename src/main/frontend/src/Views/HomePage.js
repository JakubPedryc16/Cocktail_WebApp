import React, {useEffect} from 'react';
import Navbar from '../components/Complex/Navbar';
import {goToAddCocktail, goToDeleteCocktail, goToLogin, goToSearch} from "../navigation/GoToNav";
import ImageButton from "../components/Basic/ImageButton";

import {
    ContentContainer,
    MainContainer,
    StyledButtonContainer,
    WelcomeMessage
} from "../components/StyledComponents/RegularComponents";
import {LogoAnimated} from "../components/StyledComponents/SpecialComponents";

function HomePage() {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            goToLogin();
        }
    }, []);

    return (
        <>
            <Navbar />
            <MainContainer>
                <LogoAnimated src={"../logo.png"} alt="Logo" />
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
            </MainContainer>
        </>
    );
}

export default HomePage;
