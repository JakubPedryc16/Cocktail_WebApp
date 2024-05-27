import React, { useState } from 'react';
import axios from 'axios';
import { goToHome } from "../../navigation/GoToNav";
import {AdminMainContainer, Button, CloseCardTitle, Input} from "../StyledComponents/RegularComponents";


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
                    ingredientImage: imageName
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
            <AdminMainContainer>
                <CloseCardTitle>Add Ingredient</CloseCardTitle>
                <Input type="text"
                       placeholder="Ingredient Name"
                       value={ingredientName}
                       onChange={(e) => setIngredientName(e.target.value)}
                />
                <Input
                    type="file"
                    onChange={handleFileChange}
                />
                <Button onClick={handleSubmit}>Save Ingredient</Button>
            </AdminMainContainer>
    );
}

export default AddIngredientForm;
