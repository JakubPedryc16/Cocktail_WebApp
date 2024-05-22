package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.Ingredient
import com.ztpai2024.cocktailoo.entities.CocktailsIngredients
import com.ztpai2024.cocktailoo.entities.Tag
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository

@Repository
class TagRepository {

    fun findAll(): List<Tag> {
        return transaction {
            Tag.all().toList()
        }
    }

    fun findById(id: Int): Tag? {
        return transaction {
            Tag.findById(id)
        }
    }

}
