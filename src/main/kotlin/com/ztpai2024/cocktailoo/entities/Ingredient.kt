package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class Ingredient(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Ingredient>(Ingredients)

    var ingredientName by Ingredients.ingredientName
    var ingredientImage by Ingredients.ingredientImage
}