package com.ztpai2024.cocktailoo.dtos

import com.ztpai2024.cocktailoo.entities.User


data class UserDto(
    val id: Int,
    val userEmail: String,
    val userRole : String,
    val userName: String,
    val userSurname: String
)

fun User.toDto() = UserDto(
    id = id.value,
    userEmail = userEmail,
    userRole = userRole,
    userName = userDetails.userName,
    userSurname = userDetails.userSurname
)

