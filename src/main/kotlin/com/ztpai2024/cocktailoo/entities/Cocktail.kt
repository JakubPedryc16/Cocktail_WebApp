package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class Cocktail(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Cocktail>(Cocktails)

    var cocktailName by Cocktails.cocktailName
    var cocktailImage by Cocktails.cocktailImage

    var user by User referencedOn Cocktails.userId

    var ingredients by Ingredient via CocktailsIngredients
    var tags by Tag via CocktailsTags
}