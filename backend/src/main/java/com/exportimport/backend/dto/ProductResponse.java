package com.exportimport.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String hsCode;
    private String originCountry;
    private Double weight;
    private Double value;
    private String quantity;
    private String exporterName;
}
