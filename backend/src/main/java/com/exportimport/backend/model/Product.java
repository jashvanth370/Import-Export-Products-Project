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
    private String status;
    private String quantity;


    @ManyToOne
    @JoinColumn(name = "exporter_id")
    private User exporter;


}
