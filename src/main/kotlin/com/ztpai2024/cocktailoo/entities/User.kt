package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class User(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<User>(Users)

    var userEmail by Users.userEmail

    var userDetails by UserDetails referencedOn Users.userDetailsId

}