package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.ShipmentStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderResponse {
    private Long id;
    private Long importerId;
    private Long productId;
    private int quantity;
    private String shippingAddress;
    private LocalDateTime orderDate;

    private String trackingNumber;

    @Enumerated
    private ShipmentStatus status; // e.g., "Pending", "Shipped", "In Transit", "Delivered"
    private LocalDateTime shipmentDate;
}
