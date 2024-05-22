import React from 'react';
import styled from 'styled-components';

// Stylizowany przycisk dla karty tagu
const TagCard = styled.button`
    width: 150px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;


const TagText = styled.div`
    color: white;
    font-size: 24px;
`;

const TagButton = ({ tag, onClick }) => {
    return (
        <TagCard onClick={onClick}>
            <TagText>{tag.tagName}</TagText>
        </TagCard>
    );
};

export default TagButton;
