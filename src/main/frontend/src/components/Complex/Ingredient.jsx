import React from 'react';
import styled from 'styled-components';

const IngredientCard = styled.div`
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const IngredientImage = styled.img`
    width: 100%;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
`;

const IngredientText = styled.div`
    color: white;
    font-size: 24px;
`;

const Ingredient = ({ ingredientName, ingredientImage, ingredientAmount }) => {
    return (
        <IngredientCard>
            <IngredientImage src={ingredientImage} alt={ingredientName} />
            <IngredientText>{ingredientName} ({ingredientAmount})</IngredientText>
        </IngredientCard>
    );
};

export default Ingredient;
