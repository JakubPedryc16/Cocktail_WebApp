package com.ztpai2024.cocktailoo.domain
import jakarta.persistence.*


@Entity
@Table(name = "cocktails")
data class Cocktail(

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id", nullable = false)
    var id: Int = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User? = null,

    @Column(name = "cocktail_name", nullable = false)
    var cocktailName: String? = null,

    @Column(name = "cocktail_image", nullable = false)
    var cocktailImage: String? = null,

    @ManyToMany(mappedBy = "Cocktail", fetch = FetchType.LAZY)
    var ingredients: MutableList<Ingredient> = mutableListOf(),

    @ManyToMany(mappedBy = "Cocktail", fetch = FetchType.LAZY)
    var tag: MutableList<Tag> = mutableListOf()
)
