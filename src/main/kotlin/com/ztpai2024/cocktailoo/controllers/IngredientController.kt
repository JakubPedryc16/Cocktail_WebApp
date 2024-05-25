package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.dtos.IngredientDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.repositories.IngredientRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable // Import PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.transaction.annotation.Transactional

@RestController
@RequestMapping("/users")
class nIngredientController(
    private val ingredientRepository: IngredientRepository
) {

    @GetMapping("/ingredients")
    @Transactional(readOnly = true)
    fun getAllIngredients(): ResponseEntity<List<IngredientDto>> {
        return try {
            val ingredients = ingredientRepository.findAll()
            val ingredientDtos = ingredients.map { it.toDto() }
            ResponseEntity.ok(ingredientDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania składników: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }

    @GetMapping("/ingredients/{cocktailId}")
    @Transactional(readOnly = true)
    fun getCocktailIngredients(@PathVariable cocktailId: Int): ResponseEntity<List<IngredientDto>> {
        return try {
            val cocktailIngredients = ingredientRepository.findByCocktailId(cocktailId)
            val ingredientDtos = cocktailIngredients.map { it.toDto() }
            ResponseEntity.ok(ingredientDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania składników koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }
}
