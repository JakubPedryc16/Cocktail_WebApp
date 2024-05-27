import React, { useState } from 'react';
import { goToHome } from "../../navigation/GoToNav";
import { AdminMainContainer, Button, CloseCardTitle, Input } from "../StyledComponents/RegularComponents";
import { postDataWithToken } from '../../utils/ApiUtils';

function AddIngredientForm() {
    const [ingredientName, setIngredientName] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('ingredientName', ingredientName);

            const uploadResponse = await postDataWithToken("http://localhost:8080/users/admin/upload", formData, {
                'Content-Type': 'multipart/form-data'
            });

            if (uploadResponse) {
                const imageName = uploadResponse.fileName;

                const ingredientData = {
                    ingredientName: ingredientName,
                    ingredientImage: imageName
                };

                const response = await postDataWithToken("http://localhost:8080/admin/add", ingredientData);

                if (response) {
                    console.log("Ingredient added with ID:", response);
                    goToHome();
                }
            }
        }
    };

    return (
        <AdminMainContainer>
            <CloseCardTitle>Add Ingredient</CloseCardTitle>
            <Input
                type="text"
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
