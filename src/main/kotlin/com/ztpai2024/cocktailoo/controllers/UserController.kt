package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.entities.User
import com.ztpai2024.cocktailoo.repositories.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RequestMapping("/users")
@RestController
class UserController(){

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Int): ResponseEntity<UserDto> {
        val user = userRepository.findById(id)
        return if (user != null) {
            ResponseEntity(user, HttpStatus.OK)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/me")
    fun authenticatedUser(): ResponseEntity<UserDto> {

        val authentication: Authentication = SecurityContextHolder.getContext().authentication

        val currentUser: User = authentication.principal as User

        val userDto: UserDto = transaction{ currentUser.toDto()}

        return ResponseEntity.ok(userDto)
    }

    @GetMapping("/")
    fun allUsers(): ResponseEntity<List<UserDto>> {
        val users: List<UserDto> = userRepository.findAll().map { transaction{it.toDto()} }

        return ResponseEntity.ok(users)
    }

}
