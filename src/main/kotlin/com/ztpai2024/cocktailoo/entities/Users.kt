package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object Users : IntIdTable() {
    val userDetailsId = reference("user_details_id", UsersDetails)
    val userEmail = varchar("user_email", 64)

}