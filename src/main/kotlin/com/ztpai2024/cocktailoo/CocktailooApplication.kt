package com.ztpai2024.cocktailoo



import com.ztpai2024.cocktailoo.entities.*
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication

import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class CocktailooApplication{
    @Bean
    fun init() = CommandLineRunner {
        transaction {
            SchemaUtils.createMissingTablesAndColumns(

                Cocktails,
                CocktailsIngredients,
                CocktailsTags,
                Ingredients,
                Tags,
                Users,
                UsersDetails
            )
        }
    }
}

fun main(args: Array<String>) {


//    val db = Database.connect(
//        "jdbc:postgresql://localhost:5432/postgres",
//        user = "postgres",
//        password = "admin",
//        driver = "org.postgresql.Driver")






    runApplication<CocktailooApplication>(*args)


//    transaction{
//        val details = UserDetails.new { userName = "Jan"
//            userSurname = "II"}
//        User.new {
//            userEmail = "jakabaka@papiesz"
//            userPassword = "szakszuka"
//            //userDetails = details
//        }
//    }
}




