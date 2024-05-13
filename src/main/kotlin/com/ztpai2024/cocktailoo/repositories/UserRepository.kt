package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.entities.User
import com.ztpai2024.cocktailoo.entities.Users
import kotlinx.coroutines.selects.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository

@Repository
class UserRepository {

    fun findById(id: Int): UserDto? {
        return transaction {
            User.findById(id)?.toDto()
        }
    }

    fun findByEmail(email: String): User? {
        return transaction {
            User.findByEmail(email)
        }
    }
    fun findAll(): List<User> {
        return transaction {
            User.all().toList()
        }
    }

    fun save(user: User): User {
        return transaction {
            user.flush()
            user
        }
    }

    fun deleteById(id: Int) {
        transaction {
            val user = User.findById(id)
            user?.delete()
        }
    }
}

data class UserDto(
    val id: Int,
    val userEmail: String,
    val userName: String,
    val userSurname: String
)

fun User.toDto() = UserDto(
    id = id.value,
    userEmail = userEmail,
    userName = userDetails.userName,
    userSurname = userDetails.userSurname
)

data class AuthUserDto(
    val email: String,
    val password: String,
)
fun User.toAuthDto() = AuthUserDto(
    email = userEmail,
    password = userPassword
)