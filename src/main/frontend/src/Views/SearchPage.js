import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from '../components/Basic/SearchBar';
import Cocktail from '../components/Complex/Cocktail';
import Navbar from "../components/Complex/Navbar";
import Ingredient from '../components/Complex/Ingredient';

const SearchPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
`;

const Section = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`;

const TitleCocktails = styled.h2`
    margin-bottom: 100px;
`;

const TitleIngredients = styled.h2`
    color: white;
    font-size: 30px;
    margin-bottom: 115px;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-height: 50vh;
    overflow-y: auto;
`;

const SearchPage = () => {
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCocktails, setFilteredCocktails] = useState([]);

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Unauthorised');
                    return;
                }

                const response = await axios.get('http://localhost:8080/users/cocktails', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (Array.isArray(response.data)) {
                    setCocktails(response.data);
                    setFilteredCocktails(response.data);
                } else {
                    console.error('Cocktails data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching cocktails:', error);
            }
        };

        fetchCocktails()
            .then(() => {})
            .catch((error) => {
                console.error('Error during fetchCocktails:', error);
            });
    }, []);

    const fetchIngredients = async (cocktailId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Unauthorised');
                return;
            }

            const response = await axios.get(`http://localhost:8080/users/ingredients/${cocktailId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIngredients(response.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const handleCocktailClick = (cocktail) => {
        setSelectedCocktail(cocktail);
        fetchIngredients(cocktail.id);
    };

    useEffect(() => {
        const filtered = cocktails.filter(cocktail =>
            cocktail.cocktailName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCocktails(filtered);
    }, [searchQuery, cocktails]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <Navbar />
            <SearchPageContainer>
                <Section>
                    <TitleCocktails>
                        <SearchBar placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
                    </TitleCocktails>
                    <Container>
                        {filteredCocktails.map(cocktail => (
                            <Cocktail
                                key={cocktail.id}
                                imageSrc={cocktail.cocktailImage}
                                text={cocktail.cocktailName}
                                tags={cocktail.tags} // Pass the tags here
                                onClick={() => handleCocktailClick(cocktail)}
                            />
                        ))}
                    </Container>
                </Section>

                <Section>
                    <TitleIngredients>Ingredients</TitleIngredients>
                    <Container>
                        {ingredients.map(ingredient => (
                            <Ingredient
                                key={ingredient.id}
                                ingredientName={ingredient.ingredientName}
                                ingredientImage={ingredient.ingredientImage}
                                ingredientAmount={ingredient.ingredientAmount}
                            />
                        ))}
                    </Container>
                </Section>
            </SearchPageContainer>
        </>
    );
};

export default SearchPage;
