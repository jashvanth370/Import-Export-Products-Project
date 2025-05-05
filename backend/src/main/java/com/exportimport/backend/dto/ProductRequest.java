package com.exportimport.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private String name;
    private String hsCode;
    private String originCountry;
    private Double weight;
    private Double value;
    private Long exporterId;
}

