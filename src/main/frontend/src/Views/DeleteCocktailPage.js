import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from '../components/Basic/SearchBar';
import Cocktail from '../components/Complex/Cocktail';
import Navbar from "../components/Complex/Navbar";
import Ingredient from '../components/Complex/Ingredient';
import SearchPage from "./SearchPage";

function DeleteCocktailPage(){
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [searchInput, setSearchInput] = useState([]);

    const fetchDataWithToken = async (url) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Unauthorised!');
                return null;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (e) {
            console.error('Error', e);
            return null;
        }
    };

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const cocktailData = await fetchDataWithToken('http://localhost:8080/users/cocktails');
                if (Array.isArray(cocktailData)) {
                    setCocktails(cocktailData);
                } else {
                    console.error('Cocktails data is not an array:', cocktailData);
                }
            } catch (e) {
                console.error('Error fetching cocktails:', e);
            }
        };

        fetchCocktails()
            .then(() => {});
    }, []);


    const fetchIngredients = async(cocktailId) => {
        try {
            const ingredientsData = await fetchDataWithToken(`http://localhost:8080/users/ingredients/${cocktailId}`);

            if(Array.isArray(ingredientsData)){
                setIngredients(ingredientsData)
            }
            else {
                console.error('Ingredients data is not an array:', ingredientsData);
            }
        }
        catch (e) {
            console.error('Error fetching ingredients:', e);
        }
    };


    const handleCocktailClick = (cocktail) => {
        fetchIngredients(cocktail.id)
            .then(() => {});
    };

    return(
        <>
            <Navbar/>
            <MainContainer>
                <Section>
                    <TitleCocktails>Cocktails</TitleCocktails>
                    <Container>
                        {cocktails.map(cocktail => (
                            <Cocktail
                                key={cocktail.id}
                                imageSrc={cocktail.cocktailImage}
                                text={cocktail.cocktailName}
                                tags={cocktail.tags} // Pass the tags here
                                onClick={() => handleCocktailClick(cocktail)}
                            />
                        ))}
                    </Container>
                </Section>
                <Section>
                    <TitleIngredients>Ingredients</TitleIngredients>
                    <Container>
                        {ingredients.map(ingredient => (
                            <Ingredient
                                key={ingredient.id}
                                ingredientName={ingredient.ingredientName}
                                ingredientImage={ingredient.ingredientImage}
                                ingredientAmount={ingredient.ingredientAmount}
                            />
                        ))}
                    </Container>
                </Section>

            </MainContainer>
        </>
    )
}
export default DeleteCocktailPage;

const MainContainer = styled.div`
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
    max-width: 40vw;
    overflow-y: auto;
`;
