package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table


object CocktailsIngredients : IntIdTable("cocktails_ingredients") {
    val cocktailId = reference("cocktail_id", Cocktails)
    val ingredientId = reference("ingredient_id", Ingredients)
    val amount = varchar("amount", 32)
}