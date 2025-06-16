package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.Product;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {
    private Long id;
    private String name;
    private String hsCode;
    private String originCountry;
    private Double weight;
    private Double value;
    private Long quantity;
    private String exporterName;
    private Long exporterId;
    private int statusCode;
    private String message;
    private String imageUrl;

    public ProductResponse(Product product) {
    }
}
