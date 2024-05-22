package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.entities.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Repository

@Repository
class CocktailRepository  {
    fun findAll(): List<Cocktail> {
        return transaction {
            Cocktail.all().toList()
       }
    }


    fun findById(id: Int): Cocktail? {
        return transaction {
            Cocktail.findById(id)
        }
    }

    fun addCocktail(cocktailData: CocktailDto) {
        transaction {
            val authentication: Authentication = SecurityContextHolder.getContext().authentication

            val currentUser: User = authentication.principal as User

            val newCocktail = Cocktail.new {
                this.user = currentUser
                cocktailName = cocktailData.cocktailName
                cocktailImage = cocktailData.cocktailImage
            }

            cocktailData.ingredients.forEach { ingredientData ->
                CocktailsIngredients.insert {
                    it[cocktailId] = newCocktail.id
                    it[ingredientId] = ingredientData.id
                    it[amount] = ingredientData.ingredientAmount
                }
            }

            cocktailData.tags.forEach { tagName ->
                CocktailsTags.insert {
                    it[cocktailId] = newCocktail.id
                    it[tagId] = tagName.id
                }
            }
        }
    }
}
