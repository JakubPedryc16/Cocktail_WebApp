import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
    margin-top: 15px;
    margin-bottom: 30px;
    color: white;
    display: block;
    text-align: center;
    width: 88%;
    padding: 12px;
    font-size: 16px;
    background-color: rgb(36, 35, 51);
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3; 
    }
`;

const MyButton = ({ children, onClick }) => {
    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    );
}

export default MyButton;
