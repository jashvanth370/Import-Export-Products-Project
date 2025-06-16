package com.exportimport.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Contract;

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
    private String hsCode;
    private String originCountry;
    private Double weight;
    private Double value;
    private String status;
    private Long quantity;
    private String imageUrl;



    @ManyToOne
    @JoinColumn(name = "exporter_id")
    private User exporter;


    public String getName() {
        return name;
    }
}
