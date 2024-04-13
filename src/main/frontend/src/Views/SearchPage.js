import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Cocktail from '../components/Cocktail';
import Navbar from "../components/Navbar";

const SearchPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
`;

const Section = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;

`;

const TitleCocktails = styled.h2`
    margin-bottom: 100px;
`;
const TitleIngredients = styled.h2`
    color: white;
    font-size: 30px;
    margin-bottom: 115px;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-height: 50vh;
    overflow-y: auto;
`;

const SearchPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <SearchPageContainer>
                <Section>
                    <TitleCocktails><SearchBar placeholder="Search..." /></TitleCocktails>
                    <Container>
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image.jpg" text="Cocktail 1" />


                    </Container>
                </Section>

                <Section>
                    <TitleIngredients>Ingredients</TitleIngredients>
                    <Container>
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />
                        <Cocktail imageSrc="/image2.jpg" text="Cocktail 1" />

                    </Container>
                </Section>
            </SearchPageContainer>
        </>
    );
};

export default SearchPage;
