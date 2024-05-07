package com.ztpai2024.cocktailoo

import com.ztpai2024.cocktailoo.entities.*
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@SpringBootApplication
class CocktailooApplication

fun main(args: Array<String>) {


    val db = Database.connect(
        "jdbc:postgresql://localhost:5432/postgres",
        user = "postgres",
        password = "admin")
    transaction {
//        val saintPetersburgId = meow.insert {
//            it[name] = "St. Petersburg"
//
//        }
        SchemaUtils.create(
            Cocktails,
            CocktailsIngredients,
            CocktailsTags,
            Ingredients,
            Tags,
            Users,
            UsersDetails)
        commit()
    }

    //runApplication<CocktailooApplication>(*args)
}

object meow : IntIdTable("meow") {
    val name = varchar("meow",32)
}


