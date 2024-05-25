package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.Ingredient
import com.ztpai2024.cocktailoo.entities.CocktailsIngredients
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
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

}
