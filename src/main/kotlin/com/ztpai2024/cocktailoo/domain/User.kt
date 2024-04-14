package com.ztpai2024.cocktailoo.domain

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    var id: Int? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_details_id", nullable = false)
    var userDetails: UserDetails? = null,

    @Column(name = "user_email", nullable = false)
    var userEmail: String? = null,

    @Column(name = "user_password", nullable = false)
    var userPassword: String? = null,

    @Column(name = "user_salt", nullable = false)
    var userSalt: String? = null,

    @OneToMany(mappedBy = "User", fetch = FetchType.LAZY)
    var cocktails: MutableList<Cocktail> = mutableListOf()

)