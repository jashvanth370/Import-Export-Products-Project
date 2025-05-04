package com.exportimport.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users") // optional, but recommended
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    // any other fields
}
