import React from 'react';
import styled from 'styled-components';

const EmptyWindow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 500px;
    height: 500px;
    padding: 20px;
    background-color: rgb(0, 130, 120);
    border-radius: 10px;
`;

const EmptyWindowComponent = ({ children }) => {
    return <EmptyWindow>{children}</EmptyWindow>;
};

export default EmptyWindowComponent;
