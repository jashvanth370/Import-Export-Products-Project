package com.exportimport.backend.entity;// Order.java
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long importerId;
    private Long exporterId;
    private Long productId;
    private int quantity;
    private String shippingAddress;
    private LocalDateTime orderDate;


    private String trackingNumber;

    @Enumerated
    private ShipmentStatus status; // e.g., "Pending", "Shipped", "In Transit", "Delivered"
    private LocalDateTime shipmentDate;


}
