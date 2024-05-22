package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.Ingredient
import com.ztpai2024.cocktailoo.entities.Tag
import com.ztpai2024.cocktailoo.repositories.CocktailRepository
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    fun addCocktail(@RequestBody cocktailData: CocktailDto): ResponseEntity<CocktailDto> {
        return try {
            cocktailRepository.addCocktail(cocktailData)
            ResponseEntity.ok(cocktailData)
        }
        catch (e: Exception) {
            println("Wystąpił błąd podczas dodawania koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(cocktailData)
        }
    }

}

