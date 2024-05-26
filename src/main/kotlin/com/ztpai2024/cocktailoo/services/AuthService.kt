package com.ztpai2024.cocktailoo.services


import com.ztpai2024.cocktailoo.dtos.LoginUserDto
import com.ztpai2024.cocktailoo.dtos.RegisterUserDto
import com.ztpai2024.cocktailoo.dtos.UserDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.User
import com.ztpai2024.cocktailoo.entities.UsersDetails.userName

import com.ztpai2024.cocktailoo.repositories.UserRepository

import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val authenticationManager: AuthenticationManager,
    private val passwordEncoder: PasswordEncoder
) {
    fun signup(input: RegisterUserDto): UserDto? {
        return transaction {
            val userDetails = com.ztpai2024.cocktailoo.entities.UserDetails.new {
                userName = input.name
                userSurname = input.surname
            }
            User.new {
                userEmail = input.email
                userPassword = passwordEncoder.encode(input.password)
                this.userDetails = userDetails
            }.toDto()
        }
    }

    fun authenticate(input: LoginUserDto): User? {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    input.email,
                    input.password
                )
            )

        } catch (e: AuthenticationException) {
            println("Wystąpił błąd podczas uwierzytelniania: ${e.message}")
            return null

        }
        return userRepository.findByEmail(input.email)

    }
}
