package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class User(id: EntityID<Int>) : IntEntity(id) , UserDetails {
    companion object : IntEntityClass<User>(Users) {

        fun findByEmail(email: String): User? {
            return User.find { Users.userEmail eq email }.singleOrNull()
        }
    }

    var userEmail by Users.userEmail
    var userPassword by Users.userPassword
    var userRole by Users.userRole

    var userDetails by UserDetails referencedOn Users.userDetailsId

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf()
    }

    override fun getPassword(): String = userPassword

    override fun getUsername(): String = userEmail

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true

}