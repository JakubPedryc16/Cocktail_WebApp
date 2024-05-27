import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from "../components/Complex/Navbar";
import IngredientButton from '../components/Complex/IngredientButton';
import {
    CardsSection,
    CardTitle,
    MainContainer,
    MultipleCardsContainer
} from "../components/StyledComponents/RegularComponents";

function DeleteIngredientPage() {
    const [ingredients, setIngredients] = useState([]);

    const fetchDataWithToken = async (url) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Unauthorized!');
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
        const fetchIngredients = async () => {
            try {
                const ingredientData = await fetchDataWithToken('http://localhost:8080/users/ingredients');
                if (Array.isArray(ingredientData)) {
                    setIngredients(ingredientData);
                } else {
                    console.error('Ingredients data is not an array:', ingredientData);
                }
            } catch (e) {
                console.error('Error fetching ingredients:', e);
            }
        };

        fetchIngredients();
    }, []);

    const handleDeleteIngredient = async (ingredientId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this ingredient?');
        if (!isConfirmed) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Unauthorized!');
                return;
            }

            const response = await axios.delete(`http://localhost:8080/users/admin/ingredients/${ingredientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIngredients(ingredients.filter(ingredient => ingredient.id !== ingredientId));
                console.log('Ingredient deleted successfully');
            } else {
                console.error('Failed to delete ingredient:', response.data);
            }
        } catch (e) {
            console.error('Error deleting ingredient:', e);
        }
    };

    return (
        <>
            <Navbar />
            <MainContainer>
                <CardsSection>
                    <CardTitle>Ingredients</CardTitle>
                    <MultipleCardsContainer>
                        {ingredients.map(ingredient => (
                            <IngredientButton
                                key={ingredient.id}
                                ingredient={ingredient}
                                onClick={() => handleDeleteIngredient(ingredient.id)}
                            />
                        ))}
                    </MultipleCardsContainer>
                </CardsSection>
            </MainContainer>
        </>
    );
}

export default DeleteIngredientPage;
