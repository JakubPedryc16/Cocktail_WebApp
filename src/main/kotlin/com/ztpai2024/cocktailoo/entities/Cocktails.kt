package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable



object Cocktails : IntIdTable(){
    val userId = reference("user_id", UsersDetails);
    val cocktailName = varchar("cocktail_name", 32)
    val cocktailImage = varchar("cocktail_image", 32)




}