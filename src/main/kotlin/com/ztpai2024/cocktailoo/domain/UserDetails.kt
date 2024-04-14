package com.ztpai2024.cocktailoo.domain

import jakarta.persistence.*

@Entity
@Table(name = "user_details")
data class UserDetails (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_details_id", nullable = false)
    var id: Int? = null,

    @Column(name = "user_name", nullable = false)
    var userName: String = "",

    @Column(name = "user_surname", nullable = false)
    var userSurname: String = "",

    @OneToOne(mappedBy = "UserDetails")
    var user: User? = null


)
