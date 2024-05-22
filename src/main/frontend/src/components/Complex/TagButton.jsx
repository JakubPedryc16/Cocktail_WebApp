import React from 'react';
import styled from 'styled-components';

// Stylizowany przycisk dla karty tagu
const TagButton = styled.button`
    width: 200px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

// Stylizowany tekst tagu
const TagText = styled.div`
    color: white;
    font-size: 24px;
`;

// Komponent dla tagu
const Tag = ({ id, tagName }) => {
    return (
        <TagButton>
            <TagText>{tagName}</TagText>
        </TagButton>
    );
};

export default Tag;
