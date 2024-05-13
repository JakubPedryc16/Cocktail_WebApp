package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.sql.Table

object CocktailsTags : Table("cocktails_tags") {
    val cocktailId = reference("cocktail_id", Cocktails);
    val tagId = reference("tag_id", Tags)
}