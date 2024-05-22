import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IngredientButton from './IngredientButton';
import TagButton from './TagButton';

const Container = styled.div`
    margin: 20px;
    min-height: calc(100vh - 400px); 
    padding-bottom: 200px; 
`;

const Input = styled.input`
    display: block;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 20px auto;
`;

const Section = styled.div`
    margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
    margin-bottom: 20px;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-height: 400px;
    overflow-y: scroll;
    gap: 10px;
`;

const SelectedList = styled.ul`
    list-style-type: none;
    padding: 0;
    text-align: center;
    max-height: 100px; 
    overflow-y: auto; 
`;


const SelectedListItem = styled.li`
    margin: 5px 0;
    width: 100%;
    box-sizing: border-box;

`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #295c59;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin-bottom: 50px;

    &:hover {
        background-color: rgba(0,0,0,0.25);
    }
`;

function AddCocktailPage() {
    const [cocktailName, setCocktailName] = useState('');
    const [cocktailImage, setCocktailImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
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

    const handleIngredientClick = (ingredient) => {
        setSelectedIngredients([...selectedIngredients, ingredient]);
    };

    const handleTagClick = (tag) => {
        setSelectedTags([...selectedTags, tag]);
    };

    const handleSubmit = async () => {
        const cocktailData = {
            cocktailName: cocktailName,
            cocktailImage: cocktailImage,
            ingredients: selectedIngredients.map(ing => ({
                id: ing.id,
                ingredientName: ing.ingredientName,
                ingredientImage: ing.ingredientImage,
                ingredientAmount: ing.ingredientAmount
            })),
            tags: selectedTags.map(tag => ({
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
        <Container>
            <h1>Add Cocktail</h1>
            <Input
                type="text"
                placeholder="Cocktail Name"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Cocktail Image URL"
                value={cocktailImage}
                onChange={(e) => setCocktailImage(e.target.value)}
            />
            <Section>
                <SectionTitle>Ingredients</SectionTitle>
                <ItemContainer>
                    {ingredients.map((ingredient) => (
                        <IngredientButton
                            key={ingredient.id}
                            ingredient={ingredient}
                            onClick={() => handleIngredientClick(ingredient)}
                        />
                    ))}
                </ItemContainer>
                <div>
                    <SectionTitle>Selected Ingredients</SectionTitle>
                    <SelectedList>
                        {selectedIngredients.map((ingredient, index) => (
                            <SelectedListItem key={index}>
                                {ingredient.ingredientName} ({ingredient.ingredientAmount})
                            </SelectedListItem>
                        ))}
                    </SelectedList>
                </div>
            </Section>
            <Section>
                <SectionTitle>Tags</SectionTitle>
                <ItemContainer>
                    {tags.map((tag) => (
                        <TagButton
                            key={tag.id}
                            tag={tag}
                            onClick={() => handleTagClick(tag)}
                        />
                    ))}
                </ItemContainer>
                <div>
                    <SectionTitle>Selected Tags</SectionTitle>
                    <SelectedList>
                        {selectedTags.map((tag, index) => (
                            <SelectedListItem key={index}>{tag.tagName}</SelectedListItem>
                        ))}
                    </SelectedList>
                </div>
            </Section>
            <Button onClick={handleSubmit}>Save Cocktail</Button>
        </Container>
    );
}

export default AddCocktailPage;
