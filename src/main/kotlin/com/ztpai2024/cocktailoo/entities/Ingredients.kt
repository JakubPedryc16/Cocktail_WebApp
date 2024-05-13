package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object Ingredients : IntIdTable(name = "ingredients") {
    val ingredientName = varchar("ingredient_name", 32)
    val ingredientImage = varchar("ingredient_image", 32)
    
}