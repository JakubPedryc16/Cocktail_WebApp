import React from 'react';
import styled from 'styled-components';

const EmptyWindow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 500px;
    height: 600px;
    padding: 20px;
    background-color: rgb(0, 130, 120);
    border-radius: 10px;
    
    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-weight: normal;
    color: red;
    font-size: 15px;
    
    

    @media (max-width: 1200px) {
        width: 300px;
        height: 400px;
    }
    
    @media (max-width: 950px) {
        width: 250px;
        height: 300px;
        font-size: 12px;
    }
    
`;

const EmptyWindowComponent = ({ children }) => {
    return <EmptyWindow>{children}</EmptyWindow>;
};

export default EmptyWindowComponent;
