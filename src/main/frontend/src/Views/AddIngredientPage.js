import React from 'react';
import Navbar from '../components/Complex/Navbar';
import AddIngredientForm from "../components/Forms/AddIngredientForm";
import {MainContainer} from "../components/StyledComponents/RegularComponents";

function AddIngredientPage() {
    return (
        <>
            <Navbar />
            <MainContainer>
                <AddIngredientForm />
            </MainContainer>
        </>
    );
}
export default AddIngredientPage;
