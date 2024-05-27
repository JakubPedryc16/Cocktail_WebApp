import React, { useState, useEffect } from 'react';
import IngredientButton from '../Complex/IngredientButton';
import TagButton from '../Complex/TagButton';
import { goToSearch } from "../../navigation/GoToNav";
import { ScrollingContainer } from "../StyledComponents/SpecialComponents";
import {
    Button,
    CloseCardTitle,
    ListContainer,
    ListItem,
    MultipleCardsContainerSmall,
    NoEffect,
    SmallButton,
    Input,
    SmallInput,
    ListElements, CardTitle
} from "../StyledComponents/RegularComponents";
import { fetchDataWithToken, postDataWithToken } from '../../utils/ApiUtils';

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
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const data = await fetchDataWithToken("http://localhost:8080/users/ingredients");
            if (data) {
                setIngredients(data);
            }
        };

        fetchIngredients();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const data = await fetchDataWithToken("http://localhost:8080/users/tags");
            if (data) {
                setTags(data);
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

            const uploadResponse = await postDataWithToken("http://localhost:8080/users/upload", formData, {
                'Content-Type': 'multipart/form-data'
            });

            if (uploadResponse) {
                setCocktailImage(uploadResponse.fileName);

                const cocktailData = {
                    cocktailName: cocktailName,
                    cocktailImage: cocktailImage,
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

                const response = await postDataWithToken("http://localhost:8080/users/add", cocktailData);

                if (response) {
                    console.log("Cocktail added with ID:", response);
                    goToSearch();
                }
            }
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
        <ScrollingContainer>
            <CardTitle>Add Cocktail</CardTitle>
            <Input
                type="text"
                placeholder="Cocktail Name"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
            />
            <Input
                type="file"
                onChange={handleFileChange}
            />

            <CloseCardTitle>Ingredients</CloseCardTitle>
            <Input
                type="text"
                placeholder="Search Ingredients"
                value={searchQuery}
                onChange={handleSearch}
            />
            <SmallInput
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <MultipleCardsContainerSmall>
                {filteredIngredients.map((ingredient) => (
                    <IngredientButton
                        key={ingredient.id}
                        ingredient={ingredient}
                        onClick={() => handleIngredientClick(ingredient)}
                    />
                ))}
            </MultipleCardsContainerSmall>
            <div>
                <CloseCardTitle>Selected Ingredients</CloseCardTitle>
                <ListContainer>
                    {selectedIngredients.map((ingredient, index) => (
                        <ListItem key={index}>
                            <NoEffect>
                                <ListElements>{ingredient.ingredientName}</ListElements>
                                <ListElements>{ingredient.amount}</ListElements>
                            </NoEffect>
                            <SmallButton onClick={() => handleRemoveIngredient(index)}>Remove</SmallButton>
                        </ListItem>
                    ))}
                </ListContainer>
            </div>

            <CloseCardTitle>Tags</CloseCardTitle>
            <MultipleCardsContainerSmall>
                {tags.map((tag) => (
                    <TagButton
                        key={tag.id}
                        tag={tag}
                        onClick={() => handleTagClick(tag)}
                    />
                ))}
            </MultipleCardsContainerSmall>
            <div>
                <CloseCardTitle>Selected Tags</CloseCardTitle>
                <ListContainer>
                    {selectedTags.map((tag, index) => (
                        <ListItem key={index}>
                            <NoEffect>
                                <ListElements>{tag.tagName}</ListElements>
                            </NoEffect>
                            <SmallButton onClick={() => handleRemoveTag(index)}>Remove</SmallButton>
                        </ListItem>
                    ))}
                </ListContainer>
            </div>

            <Button onClick={handleSubmit}>Save Cocktail</Button>
        </ScrollingContainer>
    );
}

export default AddCocktailForm;
