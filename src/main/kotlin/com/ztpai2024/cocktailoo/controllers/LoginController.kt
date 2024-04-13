package com.ztpai2024.cocktailoo.controllers

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class LoginController {

    @PostMapping("/api/login")
    fun login(@RequestBody loginRequest: LoginRequest): LoginResponse {

        return LoginResponse("success", "Login successful")
    }
}

data class LoginRequest(val username: String, val password: String)

data class LoginResponse(val status: String, val message: String)
