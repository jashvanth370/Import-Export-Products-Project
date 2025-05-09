package com.exportimport.backend.dTo;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentItemRequest {
    private Long productId;
    private Integer quantity;
}
