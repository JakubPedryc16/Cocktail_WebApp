import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Complex/Navbar';
import Logo from '../logo.png';
import AddCocktailForm from '../components/Complex/AddCocktailForm';

const WindowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 90vh;
`;


function AddCocktailPage() {
    return (
        <>
            <Navbar />
            <WindowContainer>
                <AddCocktailForm />
            </WindowContainer>
        </>
    );
}

export default AddCocktailPage;
