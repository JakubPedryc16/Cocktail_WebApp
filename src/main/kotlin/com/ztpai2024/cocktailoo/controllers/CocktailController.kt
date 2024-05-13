package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.Ingredient
import com.ztpai2024.cocktailoo.entities.Tag
import com.ztpai2024.cocktailoo.repositories.CocktailRepository
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping

@RestController
@RequestMapping("/users")
class CocktailController(
    private val cocktailRepository: CocktailRepository
) {

    @GetMapping("/cocktails")
    fun getAllCocktails(): ResponseEntity<List<CocktailDto>> {
        return try {
            val cocktails = transaction { cocktailRepository.findAll() }
            val cocktailDtos = transaction { cocktails.map { it.toDto() }}
            ResponseEntity.ok(cocktailDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania koktajli: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }
}

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
    val ingredientImage: String
)

fun Ingredient.toDto() = IngredientDto(
    id.value,
    ingredientName,
    ingredientImage
)

data class TagDto(
    val id: Int,
    val tagName: String
)

fun Tag.toDto() = TagDto(
    id.value,
    tagName
)