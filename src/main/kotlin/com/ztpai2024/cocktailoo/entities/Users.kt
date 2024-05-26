package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object Users : IntIdTable(name = "users") {
    val userDetailsId = reference("user_details_id", UsersDetails)
    val userEmail = varchar("user_email", 64)
    val userPassword = varchar("user_password", 64)
    val userRole = varchar("user_role", 16).default("ROLE_USER")

}