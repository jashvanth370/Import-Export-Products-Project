package com.exportimport.backend.controller;

import com.exportimport.backend.DTO.ProductRequest;
import com.exportimport.backend.DTO.ProductResponse;
import com.exportimport.backend.DTO.Response;
import com.exportimport.backend.entity.Product;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.repository.ProductRepository;
import com.exportimport.backend.repository.UserRepository;
import com.exportimport.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend calls
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add")
    public Response<?> createProduct(@RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }


    @GetMapping
    public Response<?> getAll() {
        return productService.getAllProducts();
    }

    @PutMapping("/{id}")
    public Response<?> update(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public Response<?> delete(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/exporter/{exporterId}")
    public Response<?> getProductsByExporter(@PathVariable Long exporterId) {
        return productService.getProductsByExporter(exporterId);
    }


}

