import React from 'react';
import styled from 'styled-components';

const LimeSquare = styled.div`
    width: 200px;
    height: 200px;
    background-color: rgb(0, 130, 120);;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const LimeImage = styled.img`
    width: 150px; 
    height: 150px; 
    border-radius: 50%; 
    object-fit: cover; 
`;

const LimeText = styled.div`
    color: white;
    font-size: 18px;
`;

const Cocktail = ({ imageSrc, text }) => {
    return (
        <LimeSquare>
            <LimeImage src={imageSrc} alt="Lime" />
            <LimeText>{text}</LimeText>
        </LimeSquare>
    );
};

export default Cocktail;
