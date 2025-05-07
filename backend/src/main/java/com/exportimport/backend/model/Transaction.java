package com.exportimport.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;  // Link to the user (Export/Import)
    private String productName;
    private Integer quantity;
    private Double totalAmount;
    private ShipmentStatus  status; // "PENDING", "COMPLETED", "REJECTED"

    // Getters and setters
}
