package com.ztpai2024.cocktailoo.controllers


import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.Ingredient
import com.ztpai2024.cocktailoo.entities.Tag
import com.ztpai2024.cocktailoo.entities.User
import com.ztpai2024.cocktailoo.repositories.CocktailRepository
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

@RestController
@RequestMapping("/users")
class CocktailController(
    private val cocktailRepository: CocktailRepository
) {
    @GetMapping("/cocktails")
    fun getAllCocktails(): ResponseEntity<List<CocktailDto>> {
        return try {
            val cocktails = transaction { cocktailRepository.findAll() }
            val cocktailDtos = transaction { cocktails.map { it.toDto() }}
            ResponseEntity.ok(cocktailDtos)
        } catch (e: Exception) {
            println("Error during getAllCocktails: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }

    @GetMapping("/cocktails/me")
    fun getCocktailsByUserId(): ResponseEntity<List<CocktailDto>> {
        return try {
            val authentication: Authentication = SecurityContextHolder.getContext().authentication
            val currentUser: User = authentication.principal as User
            val id: Int = currentUser.id.value;

            val cocktails = transaction { cocktailRepository.findByUserId(id) }
            val cocktailsDtos = transaction { cocktails.map { it.toDto() } }
            ResponseEntity.ok(cocktailsDtos)
        }
        catch (e: Exception){
            println("Error during getCocktailsByUserId: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }

    @PostMapping("/add")
    fun addCocktail(@RequestBody cocktailData: CocktailDto): ResponseEntity<CocktailDto> {
        return try {
            cocktailRepository.addCocktail(cocktailData)
            ResponseEntity.ok(cocktailData)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas dodawania koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(cocktailData)
        }
    }

    @PostMapping("/upload")
    fun handleFileUpload(@RequestParam("file") file: MultipartFile): ResponseEntity<Map<String, String>> {
        return try {
            val uploadDir = "uploads/cocktails"
            val filename = "${UUID.randomUUID()}_${file.originalFilename}"
            val filepath: Path = Paths.get(uploadDir, filename)
            Files.copy(file.inputStream, filepath)
            ResponseEntity.ok(mapOf("fileName" to filename))
        } catch (e: Exception) {
            println("Wystąpił błąd podczas przesyłania pliku: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mapOf("error" to "File upload failed"))
        }
    }

    @DeleteMapping("/cocktails/{id}")
    fun deleteCocktail(@PathVariable id: Int): ResponseEntity<String> {
        return try {
            val authentication: Authentication = SecurityContextHolder.getContext().authentication
            val currentUser: User = authentication.principal as User

            val cocktail = transaction { cocktailRepository.findById(id) }

            if (cocktail == null) {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cocktail not found")
            } else if (transaction { cocktail.user.id.value } != currentUser.id.value) {
                ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this cocktail")
            } else {
                transaction { cocktailRepository.deleteCocktail(id) }
                ResponseEntity.ok("Cocktail deleted successfully")
            }
        } catch (e: Exception) {
            println("Error deleting cocktail: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting cocktail")
        }
    }
}
