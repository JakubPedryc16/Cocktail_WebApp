import React from 'react';
import styled from 'styled-components';

const IngredientCard = styled.div`
    width: 180px;
    height: 180px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
`;

const IngredientImage = styled.img`
    width: 100%;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
`;

const IngredientName = styled.div`
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const IngredientAmount = styled.div`
    color: white;
    font-size: 14px;
    opacity: 0.8;
`;

const Ingredient = ({ ingredientName, ingredientImage, ingredientAmount }) => {
    return (
        <IngredientCard>
            <IngredientImage src={`http://localhost:8080/uploads/ingredients/${ingredientImage}`} alt={ingredientName} />
            <IngredientName>{ingredientName}</IngredientName>
            <IngredientAmount>{ingredientAmount}</IngredientAmount>
        </IngredientCard>
    );
};

export default Ingredient;
