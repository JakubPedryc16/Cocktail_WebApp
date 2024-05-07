package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object UsersDetails : IntIdTable(){
    val userName = varchar("user_name", 32)
    val userSurname = varchar("user_surname", 32)
}