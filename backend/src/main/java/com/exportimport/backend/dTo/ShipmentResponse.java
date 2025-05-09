// com.exportimport.dto.ShipmentResponse.java
package com.exportimport.backend.dTo;

import com.exportimport.backend.entity.ShipmentStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResponse {
    private Long id;
    private String exporterName;
    private String importerName;
    private List<String> productNames;
    private ShipmentStatus status;
    private LocalDateTime createdAt;
}
