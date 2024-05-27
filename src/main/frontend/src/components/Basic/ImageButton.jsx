import React from 'react';
import styled from 'styled-components';

const StyledImageButton = styled.button`
    
    width: 600px;
    height: 400px;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: rgba(0, 130, 120, 0.5);
    }
    &:active {
        background-color: rgba(0, 130, 120, 0.75);
    }
    @media (max-width: 1400px){
        width: 400px;
        height: 300px;
    }
    @media (max-width: 750px){
        width: 300px;
        height: 200px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
`;

const Text = styled.div`
    color: white;
    font-size: 24px;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const ImageButton = ({ imageSrc, altText, buttonText, onClick }) => {
    return (
        <StyledImageButton onClick={onClick}>
            <Image src={imageSrc} alt={altText} />
            <Text>{buttonText}</Text>
        </StyledImageButton>
    );
};

export default ImageButton;
