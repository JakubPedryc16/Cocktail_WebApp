import React from 'react';
import styled from 'styled-components';

const Cocktail = ({ imageSrc, text, tags, onClick }) => {
    return (
        <LimeButton onClick={onClick}>
            <LimeImage src={`http://localhost:8080/uploads/cocktails/${imageSrc}`} alt={text} />
            <LimeText>{text}</LimeText>
            <TagContainer>
                {tags.map(tag => (
                    <Tag key={tag.id}>{tag.tagName}</Tag>
                ))}
            </TagContainer>
        </LimeButton>
    );
};

export default Cocktail;


const LimeButton = styled.button`
    width: 220px;
    height: 280px;
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
`;

const LimeImage = styled.img`
    width: 100%;
    height: 140px;
    border-radius: 10px;
    object-fit: cover;
`;

const LimeText = styled.div`
    color: white;
    font-size: 20px;
    text-align: center;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
`;

const Tag = styled.span`
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
`;
