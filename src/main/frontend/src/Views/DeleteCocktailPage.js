import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from '../components/Basic/SearchBar';
import Cocktail from '../components/Complex/Cocktail';
import Navbar from "../components/Complex/Navbar";
import Ingredient from '../components/Complex/Ingredient';
import SearchPage from "./SearchPage";

function DeleteCocktailPage() {
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);

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
                const cocktailData = await fetchDataWithToken('http://localhost:8080/users/cocktails/me');
                if (Array.isArray(cocktailData)) {
                    setCocktails(cocktailData);
                } else {
                    console.error('Cocktails data is not an array:', cocktailData);
                }
            } catch (e) {
                console.error('Error fetching cocktails:', e);
            }
        };

        fetchCocktails();
    }, []);

    const fetchIngredients = async (cocktailId) => {
        try {
            const ingredientsData = await fetchDataWithToken(`http://localhost:8080/users/ingredients/${cocktailId}`);

            if (Array.isArray(ingredientsData)) {
                setIngredients(ingredientsData);
            } else {
                console.error('Ingredients data is not an array:', ingredientsData);
            }
        } catch (e) {
            console.error('Error fetching ingredients:', e);
        }
    };

    const handleCocktailClick = (cocktail) => {
        setSelectedCocktail(cocktail);
        fetchIngredients(cocktail.id);
    };

    const handleDeleteCocktail = async () => {
        if (selectedCocktail) {
            const isConfirmed = window.confirm('Are you sure you want to delete this cocktail?');
            if (!isConfirmed) return;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised!');
                    return;
                }

                const response = await axios.delete(`http://localhost:8080/users/cocktails/${selectedCocktail.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setCocktails(cocktails.filter(cocktail => cocktail.id !== selectedCocktail.id));
                    setSelectedCocktail(null); // Clear selection after deletion
                    console.log('Cocktail deleted successfully');
                } else {
                    console.error('Failed to delete cocktail:', response.data);
                }
            } catch (e) {
                console.error('Error deleting cocktail:', e);
            }
        } else {
            console.error('No cocktail selected for deletion');
        }
    };

    return (
        <>
            <Navbar />
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
                        <DeleteButton onClick={handleDeleteCocktail}>Delete</DeleteButton>
                    </Container>
                </Section>
            </MainContainer>
        </>
    );
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
    color: white;
    font-size: 30px;
    margin-bottom: 115px;
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

const DeleteButton = styled.button`
    position: fixed;
    bottom: 50px;

    padding: 15px 80px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 24px;
    &:hover {
        background-color: darkred;
    }
`;
