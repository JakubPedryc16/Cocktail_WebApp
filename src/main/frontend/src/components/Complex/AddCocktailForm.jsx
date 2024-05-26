import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IngredientButton from './IngredientButton';
import TagButton from './TagButton';
import {goToHome, goToSearch} from "../../navigation/GoToNav";

const Container = styled.div`
    margin: 20px;
    min-height: calc(100vh - 400px);
    padding-bottom: 200px;
    color: white;
    font-family: 'Roboto', sans-serif;
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
    justify-content: center;
    flex-wrap: wrap;
    max-height: 200px;
    max-width: 800px;
    overflow-y: scroll;
    gap: 10px;
`;

const SelectedList = styled.ul`
    list-style-type: none;
    padding: 0;
    text-align: center;
    max-height: 200px;
    overflow-y: auto;
    background-color: rgba(0,0,0,0.2);
`;

const SelectedListItem = styled.li`
    margin: 15px 5px 15px;
    width: 95%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const IngredientInfo = styled.div`
    display: flex;
    align-items: center;
`;

const RemoveButton = styled.button`
    padding: 5px 10px;
    cursor: pointer;
    background-color: #ff3b3b;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 14px;


    &:hover {
        background-color: rgba(0,0,0,0.25);
    }
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

const QuantityInput = styled.input`
    display: block;
    padding: 5px;
    font-size: 14px;
    width: 100%;
    max-width: 100px;
    margin: 5px auto;
`;
const AmountWindow = styled.span` 
    background-color: #295c59;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 25px;
`;

function AddCocktailForm() {
    const [cocktailName, setCocktailName] = useState('');
    const [cocktailImage, setCocktailImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIngredients, setFilteredIngredients] = useState([])

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

    useEffect(() => {
        setFilteredIngredients(ingredients.filter(ingredient =>
            ingredient.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [ingredients, searchQuery]);


    const handleIngredientClick = (ingredient) => {
        if (!amount) {
            return;
        }
        setSelectedIngredients([...selectedIngredients, { ...ingredient, amount }]);
    };

    const handleTagClick = (tag) => {
        setSelectedTags([...selectedTags, tag]);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = ingredients.filter(ingredient =>
            ingredient.ingredientName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredIngredients(filtered);
    };

    const handleSubmit = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised');
                    return;
                }

                const uploadResponse = await axios.post("http://localhost:8080/users/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const imageName = uploadResponse.data.fileName;
                setCocktailImage(imageName);

                const cocktailData = {
                    cocktailName: cocktailName,
                    cocktailImage: imageName,
                    ingredients: selectedIngredients.map(ing => ({
                        id: ing.id,
                        ingredientName: ing.ingredientName,
                        ingredientImage: ing.ingredientImage,
                        ingredientAmount: ing.amount
                    })),
                    tags: selectedTags.map(tag => ({
                        id: tag.id,
                        tagName: tag.tagName
                    }))
                };

                const response = await axios.post("http://localhost:8080/users/add", cocktailData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Cocktail added with ID:", response.data);
            } catch (error) {
                console.error("Error adding cocktail:", error);
            }
            goToSearch();
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...selectedIngredients];
        updatedIngredients.splice(index, 1);
        setSelectedIngredients(updatedIngredients);
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...selectedTags];
        updatedTags.splice(index, 1);
        setSelectedTags(updatedTags);
    };

    return (
        <Container>
            <h1>Add Cocktail</h1>
            <Input type="text"
              placeholder="Cocktail Name"
              value={cocktailName}
              onChange={(e) => setCocktailName(e.target.value)}
            />
            <Input
                type="file"
                onChange={handleFileChange}
            />
            <QuantityInput
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Section>
                <SectionTitle>Ingredients</SectionTitle>
                <Input
                    type="text"
                    placeholder="Search Ingredients"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <ItemContainer>
                    {filteredIngredients.map((ingredient) => (
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
                            <IngredientInfo>
                                <AmountWindow>{ingredient.ingredientName}</AmountWindow>
                                <AmountWindow>{ingredient.amount}</AmountWindow>
                             </IngredientInfo>
                                <RemoveButton onClick={() => handleRemoveIngredient(index)}>Remove</RemoveButton>
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
                            <SelectedListItem key={index}>
                                <IngredientInfo>
                                <AmountWindow>{tag.tagName}</AmountWindow>
                                </IngredientInfo>
                                <RemoveButton onClick={() => handleRemoveTag(index)}>Remove</RemoveButton>
                            </SelectedListItem>
                        ))}
                    </SelectedList>
                </div>
            </Section>
            <MainButton onClick={handleSubmit}>Save Cocktail</MainButton>
        </Container>
    );
}

export default AddCocktailForm;

