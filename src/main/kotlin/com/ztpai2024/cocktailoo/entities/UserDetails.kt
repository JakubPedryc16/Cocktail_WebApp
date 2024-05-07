package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UserDetails(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserDetails>(UsersDetails)

    var userName by UsersDetails.userName
    var userSurname by UsersDetails.userSurname

    val user by User referrersOn Users.userDetailsId
}