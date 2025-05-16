package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.ShipmentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ShipmentResponse {
    private Long orderId;
    private String trackingNumber;
    private ShipmentStatus status;
    private LocalDateTime shippedDate;
    private LocalDateTime estimatedDelivery;
}

