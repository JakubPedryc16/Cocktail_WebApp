import React from 'react';
import styled from 'styled-components';

const LimeButton = styled.button`
    width: 250px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s, border 0.3s;

    &:hover {
        background-color: rgba(0, 130, 120, 0.5);
    }
    &:active {
        background-color: rgba(0, 130, 120, 0.75);
    }
`;

const LimeImage = styled.img`
    width: 100%;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
`;

const LimeText = styled.div`
    color: white;
    font-size: 24px;
`;

const Cocktail = ({ imageSrc, text, onClick, selected }) => {
    return (
        <LimeButton onClick={onClick} selected={selected}>
            <LimeImage src={imageSrc} alt="Cocktail" />
            <LimeText>{text}</LimeText>
        </LimeButton>
    );
};

export default Cocktail;
