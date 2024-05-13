package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.entities.Cocktail
import org.jetbrains.exposed.sql.transactions.transaction
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
}
