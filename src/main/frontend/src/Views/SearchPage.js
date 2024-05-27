
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Basic/SearchBar';
import Cocktail from '../components/Complex/Cocktail';
import Navbar from "../components/Complex/Navbar";
import Ingredient from '../components/Complex/Ingredient';
import { fetchDataWithToken } from '../utils/ApiUtils';
import {
    CardsSection,
    CardTitle,
    CocktailsPageContainer,
    MultipleCardsContainer
} from "../components/StyledComponents/RegularComponents";

function SearchPage() {
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCocktails, setFilteredCocktails] = useState([]);

    useEffect(() => {
        const fetchCocktails = async () => {
            const data = await fetchDataWithToken('http://localhost:8080/users/cocktails');
            if (Array.isArray(data)) {
                setCocktails(data);
                setFilteredCocktails(data);
            } else {
                console.error('Cocktails data is not an array:', data);
            }
        };
        fetchCocktails();
    }, []);

    const fetchIngredients = async (cocktailId) => {
        const data = await fetchDataWithToken(`http://localhost:8080/users/ingredients/${cocktailId}`);
        if (data) {
            setIngredients(data);
        }
    };

    const handleCocktailClick = (cocktail) => {
        fetchIngredients(cocktail.id);
    };

    useEffect(() => {
        const filtered = cocktails.filter(cocktail =>
            cocktail.cocktailName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cocktail.tags.some(tag => tag.tagName.toLowerCase().includes(searchQuery.toLowerCase()))
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
                        <SearchBar placeholder="Search by name or tag" value={searchQuery} onChange={handleSearchChange} />
                    </CardTitle>
                    <MultipleCardsContainer>
                        {filteredCocktails.map(cocktail => (
                            <Cocktail
                                key={cocktail.id}
                                imageSrc={cocktail.cocktailImage}
                                text={cocktail.cocktailName}
                                tags={cocktail.tags}
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
