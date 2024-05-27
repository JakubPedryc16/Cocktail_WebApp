import React from 'react';
import styled from 'styled-components';

const IngredientButton = ({ ingredient, onClick }) => {
    return (
        <IngredientCard onClick={onClick}>
            <IngredientImage src={`http://localhost:8080/uploads/ingredients/${ingredient.ingredientImage}`} alt={ingredient.ingredientName} />
            <IngredientText>{ingredient.ingredientName}</IngredientText>
        </IngredientCard>
    );
};
export default IngredientButton;


const IngredientCard = styled.button`
    width: 150px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 950px) {
        width: 100px;
        height: 80px;
        padding: 5px;
    }
`;

const IngredientImage = styled.img`
    width: 100%;
    height: 120px;
    border-radius: 10px;
    object-fit: cover;

    @media (max-width: 950px) {
        height: 50px;
        width: 80%;
    }
`;


const IngredientText = styled.div`
    color: white;
    margin-top:10px;
    font-size: 16px;

    @media (max-width: 950px) {
        font-size: 12px;
    }
`;
