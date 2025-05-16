package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.ShipmentStatus;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentRequest {
    private String trackingNumber;
    private LocalDateTime shipmentDate;

    @Enumerated
    private ShipmentStatus status;

}
