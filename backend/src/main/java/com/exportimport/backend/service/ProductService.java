package com.exportimport.backend.service;

import com.exportimport.backend.dTo.ProductRequest;
import com.exportimport.backend.dTo.ProductResponse;
import com.exportimport.backend.entity.Product;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.repository.ProductRepository;
import com.exportimport.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public ProductResponse createProduct(ProductRequest request) {
        User user = userRepo.findById(request.getExporterId()).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = Product.builder()
                .name(request.getName())
                .hsCode(request.getHsCode())
                .originCountry(request.getOriginCountry())
                .weight(request.getWeight())
                .value(request.getValue())
                .quantity(request.getQuantity())
                .exporter(user)
                .build();
        product = productRepo.save(product);

        return mapToResponse(product);
    }

    public List<ProductResponse> getAllProducts() {
        return productRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        product.setName(request.getName());
        product.setHsCode(request.getHsCode());
        product.setOriginCountry(request.getOriginCountry());
        product.setWeight(request.getWeight());
        product.setValue(request.getValue());
        product.setQuantity(request.getQuantity());
        return mapToResponse(productRepo.save(product));
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    private ProductResponse mapToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .hsCode(product.getHsCode())
                .originCountry(product.getOriginCountry())
                .weight(product.getWeight())
                .value(product.getValue())
                .quantity(product.getQuantity())
                .exporterName(product.getExporter().getName())
                .build();
    }

//    public List<ProductResponse> getProductsByExporter(Long exporterId) {
//        return productRepo.findByExporterId(exporterId)
//                .stream().map(this::mapToResponse).toList();
//    }

}

