package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.dtos.IngredientDto
import com.ztpai2024.cocktailoo.entities.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Repository

@Repository
class IngredientRepository {

    fun findAll(): List<Ingredient> {
        return transaction {
            Ingredient.all().toList()
        }
    }

    fun findById(id: Int): Ingredient? {
        return transaction {
            Ingredient.findById(id)
        }
    }

    fun findByCocktailId(cocktailId: Int): List<Ingredient> {
        return transaction {
            CocktailsIngredients
                .select { CocktailsIngredients.cocktailId eq cocktailId }
                .mapNotNull { row ->
                    Ingredient.findById(row[CocktailsIngredients.ingredientId])?.apply {
                        ingredientAmount = row[CocktailsIngredients.amount]
                    }
                }
        }
    }

    fun addIngredient(ingredientData: IngredientDto) {
        try {
            transaction {
                val authentication: Authentication = SecurityContextHolder.getContext().authentication

                val currentUser: User = authentication.principal as User

                val newCocktail = Ingredient.new {
                    ingredientName = ingredientData.ingredientName
                    ingredientImage = ingredientData.ingredientImage
                }

            }
        } catch (e: Exception) {
            println("Error adding cocktail: ${e.message}")

            throw e
        }
    }

}
