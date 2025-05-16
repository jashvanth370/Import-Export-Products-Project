package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.ShipmentStatus;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderRequest {
    private Long importerId;
    private Long exporterId;
    private Long productId;
    private int quantity;
    private String shippingAddress;
    private LocalDateTime orderDate;

    @Enumerated
    private ShipmentStatus status; // e.g., "Pending", "Shipped", "In Transit", "Delivered"
}
