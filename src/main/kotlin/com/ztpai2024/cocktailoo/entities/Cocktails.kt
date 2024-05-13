package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable



object Cocktails : IntIdTable(name = "cocktails") {
    val userId = reference("user_id", Users);
    val cocktailName = varchar("cocktail_name", 32)
    val cocktailImage = varchar("cocktail_image", 32)




}