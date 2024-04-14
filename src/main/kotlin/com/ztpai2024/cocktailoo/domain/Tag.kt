package com.ztpai2024.cocktailoo.domain

import jakarta.persistence.*

@Entity
@Table(name = "tags")
data class Tag (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", nullable = false)
    var tagId: Int? = null,

    @Column(name = "tag_name", nullable = false)
    var tagName: String? = null,

    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    var cocktails: MutableList<Cocktail> = mutableListOf()
)