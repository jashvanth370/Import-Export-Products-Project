
package com.exportimport.backend.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentRequest {
    private Long exporterId;
    private Long importerId;
    private List<ShipmentItemRequest> items;
}
