package com.exportimport.backend.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String hsCode; // Harmonized System Code for international trade

    private String originCountry;

    private Double weight;

    private Double value;

    // Link product to user (exporter)
    @ManyToOne
    @JoinColumn(name = "owner_user_id")
    private User owner;
}
