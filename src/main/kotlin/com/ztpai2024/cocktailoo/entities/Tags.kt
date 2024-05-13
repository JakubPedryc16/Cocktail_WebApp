package com.ztpai2024.cocktailoo.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object Tags : IntIdTable(name = "tags") {
    val tagName = varchar("tag_name", 32)
}