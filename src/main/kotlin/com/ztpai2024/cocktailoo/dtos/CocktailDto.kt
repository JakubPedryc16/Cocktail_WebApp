package com.ztpai2024.cocktailoo.dtos

import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.Ingredient
import com.ztpai2024.cocktailoo.entities.Tag

data class CocktailDto(
    val id: Int,
    val cocktailName: String,
    val cocktailImage: String,
    val userId: Int,
    val ingredients: List<IngredientDto>,
    val tags: List<TagDto>
)

fun Cocktail.toDto() = CocktailDto(
    id.value,
    cocktailName,
    cocktailImage,
    user.id.value,
    ingredients.map { it.toDto() },
    tags.map { it.toDto() }
)
data class IngredientDto(
    val id: Int,
    val ingredientName: String,
    val ingredientImage: String,
    val ingredientAmount: String
)

fun Ingredient.toDto() = IngredientDto(
    id.value,
    ingredientName,
    ingredientImage,
    ingredientAmount
)

data class TagDto(
    val id: Int,
    val tagName: String
)

fun Tag.toDto() = TagDto(
    id.value,
    tagName
)