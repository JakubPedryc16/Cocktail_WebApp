package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.dtos.IngredientDto
import com.ztpai2024.cocktailoo.dtos.TagDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.repositories.IngredientRepository
import com.ztpai2024.cocktailoo.repositories.TagRepository
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable // Import PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.transaction.annotation.Transactional

@RestController
@RequestMapping("/users")
class TagController(
    private val tagRepository: TagRepository
) {

    @GetMapping("/tags")
    @Transactional(readOnly = true)
    fun getAllTags(): ResponseEntity<List<TagDto>> {
        return try {
            val tags = transaction{tagRepository.findAll()}
            val tagsDtos = transaction {tags.map { it.toDto() }}
            ResponseEntity.ok(tagsDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania tagow: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }

}
