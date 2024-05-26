import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { goToHome } from "../../navigation/GoToNav";

const Container = styled.div`
    margin: 200px;
    color: white;
    font-family: 'Roboto', sans-serif;


    display: flex;
    justify-content: center;
    align-content: center;
    
    
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column  ;
    flex-wrap: wrap;
    gap: 10px;
    width: 800px;
    
`;

const Input = styled.input`
    display: block;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 20px auto;
`;

const MainButton = styled.button`
    padding: 10px 60px;
    font-size: 16px;
    cursor: pointer;
    background-color: #295c59;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;

    &:hover {
        background-color: rgba(0,0,0,0.25);
    }
`;

const TitleIngredients = styled.h2`
    color: white;
    font-size: 30px;
    text-align: center;
`;

function AddIngredientForm() {
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState(0);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('ingredientName', ingredientName);
            formData.append('ingredientAmount', ingredientAmount);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised');
                    return;
                }

                const uploadResponse = await axios.post("http://localhost:8080/users/admin/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const imageName = uploadResponse.data.fileName;

                const ingredientData = {
                    ingredientName: ingredientName,
                    ingredientImage: imageName,
                    ingredientAmount: ingredientAmount
                };

                const response = await axios.post("http://localhost:8080/admin/add", ingredientData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Ingredient added with ID:", response.data);
                goToHome();
            } catch (error) {
                console.error("Error adding ingredient:", error);
            }
        }
    };

    return (
        <Container>
            <ItemContainer>
                <TitleIngredients>Add Ingredient</TitleIngredients>
                <Input type="text"
                       placeholder="Ingredient Name"
                       value={ingredientName}
                       onChange={(e) => setIngredientName(e.target.value)}
                />
                <Input type="number"
                       placeholder="Ingredient Amount"
                       value={ingredientAmount}
                       onChange={(e) => setIngredientAmount(parseInt(e.target.value))}
                />
                <Input
                    type="file"
                    onChange={handleFileChange}
                />
                <MainButton onClick={handleSubmit}>Save Ingredient</MainButton>
            </ItemContainer>
        </Container>
    );
}

export default AddIngredientForm;
