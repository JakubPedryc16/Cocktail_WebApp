package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.dtos.LoginUserDto
import com.ztpai2024.cocktailoo.dtos.RegisterUserDto
import com.ztpai2024.cocktailoo.dtos.UserDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.User

import com.ztpai2024.cocktailoo.services.AuthService
import com.ztpai2024.cocktailoo.services.JwtService
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/auth")
class AuthController(private val jwtService: JwtService, private val authService: AuthService) {

    @PostMapping("/signup")
    fun register(@RequestBody registerUserDto: RegisterUserDto): ResponseEntity<UserDto> {
        val registeredUser: UserDto? = authService.signup(registerUserDto)
        return if (registeredUser != null) {
            ResponseEntity.ok(registeredUser)
        } else {
            ResponseEntity.badRequest().build()
        }
    }

    @PostMapping("/login")
    fun authenticate(@RequestBody loginUserDto: LoginUserDto): ResponseEntity<out Any> {
        val authenticatedUser: User? =authService.authenticate(loginUserDto)
        val jwtToken = if (authenticatedUser != null) {
            jwtService.generateToken(authenticatedUser as UserDetails)
        } else {
            return ResponseEntity<String>("Access Denied", HttpStatus.FORBIDDEN)
        }

        val loginResponse = LoginResponse(
            token = jwtToken,
            expiresIn = jwtService.expirationTime,
            role = authenticatedUser.userRole
        )

        return ResponseEntity.ok<LoginResponse>(loginResponse)
    }
}

data class LoginResponse(
    var token: String?,
    var expiresIn: Long,
    var role: String? = "USER"
)
