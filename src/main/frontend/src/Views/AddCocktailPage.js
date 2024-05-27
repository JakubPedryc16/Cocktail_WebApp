import React from 'react';
import Navbar from '../components/Complex/Navbar';
import AddCocktailForm from '../components/Forms/AddCocktailForm';
import {MainContainer} from "../components/StyledComponents/RegularComponents";

function AddCocktailPage() {
    return (
        <>
            <Navbar />
            <MainContainer>
                <AddCocktailForm />
            </MainContainer>
        </>
    );
}

export default AddCocktailPage;
