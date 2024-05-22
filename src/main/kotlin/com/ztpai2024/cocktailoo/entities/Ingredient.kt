package com.ztpai2024.cocktailoo.entities

import com.ztpai2024.cocktailoo.entities.CocktailsIngredients.amount
import com.ztpai2024.cocktailoo.entities.CocktailsIngredients.ingredientId
import com.ztpai2024.cocktailoo.entities.User.Companion.referrersOn
import kotlinx.coroutines.selects.select
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class Ingredient(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Ingredient>(Ingredients)

    var ingredientName by Ingredients.ingredientName
    var ingredientImage by Ingredients.ingredientImage
    var ingredientAmount: String = transaction {
        CocktailsIngredients.select(amount).where{ ingredientId eq id}
            .map { it[amount] }
            .firstOrNull() ?: "0"
        }


}