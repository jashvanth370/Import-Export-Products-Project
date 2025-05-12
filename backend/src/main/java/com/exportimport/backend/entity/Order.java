package com.exportimport.backend.entity;// Order.java
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long importerId;
    private Long productId;
    private int quantity;
    private String shippingAddress;
    private LocalDateTime orderDate;

    public Order() {}

    public Order(Long importerId, Long productId, int quantity, String shippingAddress) {
        this.importerId = importerId;
        this.productId = productId;
        this.quantity = quantity;
        this.shippingAddress = shippingAddress;
        this.orderDate = LocalDateTime.now();
    }

}
