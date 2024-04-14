package com.ztpai2024.cocktailoo.domain

import jakarta.persistence.*

@Entity
@Table(name = "ingredients")
data class Ingredient (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    var id: Int = 0,

    @Column(name = "ingredient_name")
    var name: String = "",

    @Column(name = "ingredient_image")
    var image: String = "",

    @ManyToMany(fetch = FetchType.LAZY)
    var cocktails: MutableList<Cocktail> = mutableListOf()

)