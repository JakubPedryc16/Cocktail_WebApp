package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.sql.Table


object CocktailsIngredients : Table() {
    val cocktailId = reference("cocktail_id", Cocktails)
    val ingredientId = reference("ingredient_id", Ingredients)
    val ingredientAmount = varchar("ingredient_amount", 32)
}