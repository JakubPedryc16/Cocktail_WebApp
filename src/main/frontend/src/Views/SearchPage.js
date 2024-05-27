import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/Basic/SearchBar';
import Cocktail from '../components/Complex/Cocktail';
import Navbar from "../components/Complex/Navbar";
import Ingredient from '../components/Complex/Ingredient';
import {
    CardsSection,
    CocktailsPageContainer, CardTitle, MultipleCardsContainer
} from "../components/StyledComponents/RegularComponents";



function SearchPage(){
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);

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
            <CocktailsPageContainer>
                <CardsSection>
                    <CardTitle>
                        <SearchBar placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
                    </CardTitle>
                    <MultipleCardsContainer>
                        {filteredCocktails.map(cocktail => (
                            <Cocktail
                                key={cocktail.id}
                                imageSrc={cocktail.cocktailImage}
                                text={cocktail.cocktailName}
                                tags={cocktail.tags} // Pass the tags here
                                onClick={() => handleCocktailClick(cocktail)}
                            />
                        ))}
                    </MultipleCardsContainer>
                </CardsSection>

                <CardsSection>
                    <CardTitle>Ingredients</CardTitle>
                    <MultipleCardsContainer>
                        {ingredients.map(ingredient => (
                            <Ingredient
                                key={ingredient.id}
                                ingredientName={ingredient.ingredientName}
                                ingredientImage={ingredient.ingredientImage}
                                ingredientAmount={ingredient.ingredientAmount}
                            />
                        ))}
                    </MultipleCardsContainer>
                </CardsSection>
            </CocktailsPageContainer>
        </>
    );
}

export default SearchPage;
