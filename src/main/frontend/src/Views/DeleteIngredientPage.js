// src/pages/DeleteIngredientPage.js
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Complex/Navbar";
import IngredientButton from '../components/Complex/IngredientButton';
import { fetchDataWithToken, deleteDataWithToken } from '../utils/ApiUtils';
import {
    CardsSection,
    CardTitle,
    MainContainer,
    MultipleCardsContainer
} from "../components/StyledComponents/RegularComponents";

function DeleteIngredientPage() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const data = await fetchDataWithToken('http://localhost:8080/users/ingredients');
            if (Array.isArray(data)) {
                setIngredients(data);
            } else {
                console.error('Ingredients data is not an array:', data);
            }
        };

        fetchIngredients();
    }, []);

    const handleDeleteIngredient = async (ingredientId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this ingredient?');
        if (!isConfirmed) return;

        const response = await deleteDataWithToken(`http://localhost:8080/users/admin/ingredients/${ingredientId}`);
        if (response && response.status === 200) {
            setIngredients(ingredients.filter(ingredient => ingredient.id !== ingredientId));
            console.log('Ingredient deleted successfully');
        } else {
            console.error('Failed to delete ingredient:', response.data);
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
