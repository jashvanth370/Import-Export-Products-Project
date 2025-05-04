package com.exportimport.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentItemRequest {
    private Long productId;
    private Integer quantity;
}
