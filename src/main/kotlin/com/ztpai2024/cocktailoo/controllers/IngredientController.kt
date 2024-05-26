package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.dtos.IngredientDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.repositories.IngredientRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

@RestController
@RequestMapping("/users")
class IngredientController(
    private val ingredientRepository: IngredientRepository
) {

    @GetMapping("/ingredients")
    @Transactional(readOnly = true)
    fun getAllIngredients(): ResponseEntity<List<IngredientDto>> {
        return try {
            val ingredients = ingredientRepository.findAll()
            val ingredientDtos = ingredients.map { it.toDto() }
            ResponseEntity.ok(ingredientDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania składników: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }

    @GetMapping("/ingredients/{cocktailId}")
    @Transactional(readOnly = true)
    fun getCocktailIngredients(@PathVariable cocktailId: Int): ResponseEntity<List<IngredientDto>> {
        return try {
            val cocktailIngredients = ingredientRepository.findByCocktailId(cocktailId)
            val ingredientDtos = cocktailIngredients.map { it.toDto() }
            ResponseEntity.ok(ingredientDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania składników koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }
    @PostMapping("/admin/upload")
    fun handleFileUpload(@RequestParam("file") file: MultipartFile): ResponseEntity<Map<String, String>> {
        return try {
            val uploadDir = "uploads/ingredients"
            val filename = "${UUID.randomUUID()}_${file.originalFilename}"
            val filepath: Path = Paths.get(uploadDir, filename)
            Files.createDirectories(filepath.parent)
            Files.copy(file.inputStream, filepath)
            ResponseEntity.ok(mapOf("fileName" to filename))
        } catch (e: Exception) {
            println("Wystąpił błąd podczas przesyłania pliku: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mapOf("error" to "File upload failed"))
        }
    }

    @PostMapping("/admin/add")
    fun addIngredient(@RequestBody ingredientData: IngredientDto): ResponseEntity<IngredientDto> {
        return try {
            ingredientRepository.addIngredient(ingredientData)
            ResponseEntity.ok(ingredientData)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas dodawania koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ingredientData)
        }
    }
}
