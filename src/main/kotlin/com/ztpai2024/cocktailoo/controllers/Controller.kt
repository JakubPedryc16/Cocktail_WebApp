package com.ztpai2024.cocktailoo.controllers

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class Controller {

    @GetMapping("/")
    fun index(model: Model): String {
        model.addAttribute("message", "Hello from Spring Boot!")
        return "index"
    }
}
