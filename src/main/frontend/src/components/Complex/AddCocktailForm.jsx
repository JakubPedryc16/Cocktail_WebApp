import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientButton from './IngredientButton'; // Zaimportuj komponent IngredientButton
import TagButton from './TagButton'; // Zaimportuj komponent TagButton

function AddCocktailPage() {
    const [cocktailName, setCocktailName] = useState('');
    const [cocktailImage, setCocktailImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState({ id: '', ingredientName: '', ingredientImage: '', ingredientAmount: '' });
    const [currentTag, setCurrentTag] = useState('');

    useEffect(() => {
        // Pobierz listę składników z serwera przy załadowaniu komponentu
        const fetchIngredients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised');
                    return;
                }

                const response = await axios.get("http://localhost:8080/users/ingredients", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIngredients(response.data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchIngredients();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised');
                    return;
                }

                const response = await axios.get("http://localhost:8080/users/tags", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, currentIngredient]);
        setCurrentIngredient({ id: '', ingredientName: '', ingredientImage: '', ingredientAmount: '' });
    };

    const handleAddTag = () => {
        setTags([...tags, currentTag]);
        setCurrentTag('');
    };

    const handleSubmit = async () => {
        const cocktailData = {
            cocktailName: cocktailName,
            cocktailImage: cocktailImage,
            ingredients: ingredients.map(ing => ({
                id: ing.id,
                ingredientName: ing.ingredientName,
                ingredientAmount: ing.ingredientAmount
            })),
            tags: tags.map(tag => ({
                id: tag.id,
                tagName: tag.tagName
            }))
        };
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Unauthorised');
                return;
            }

            const response = await axios.post("http://localhost:8080/users/add", cocktailData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Cocktail added with ID:", response.data);
        } catch (error) {
            console.error("Error adding cocktail:", error);
        }
    };

    return (
        <div>
            <h1>Add Cocktail</h1>
            <input
                type="text"
                placeholder="Cocktail Name"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Cocktail Image URL"
                value={cocktailImage}
                onChange={(e) => setCocktailImage(e.target.value)}
            />
            <div>
                <h2>Ingredients</h2>
                <select
                    value={currentIngredient.id}
                    onChange={(e) => setCurrentIngredient({ ...currentIngredient, id: e.target.value })}
                >
                    <option value="">Select Ingredient</option>
                    {ingredients.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>{ingredient.ingredientName}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Amount"
                    value={currentIngredient.ingredientAmount}
                    onChange={(e) => setCurrentIngredient({ ...currentIngredient, ingredientAmount: e.target.value })}
                />
                <button onClick={handleAddIngredient}>Add Ingredient</button>
                <ul style={{ overflowY: 'scroll', maxHeight: '200px' }}>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}><IngredientButton {...ingredient} /></li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Tags</h2>
                <input
                    type="text"
                    placeholder="Tag Name"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                />
                <button onClick={handleAddTag}>Add Tag</button>
                <ul style={{ overflowY: 'scroll', maxHeight: '200px' }}>
                    {tags.map((tag, index) => (
                        <li key={index}><TagButton {...tag} /></li>
                    ))}
                </ul>
            </div>
            <button onClick={handleSubmit}>Save Cocktail</button>
        </div>
    );
}

export default AddCocktailPage;
