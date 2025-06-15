package com.exportimport.backend.controller;

import com.exportimport.backend.DTO.ProductRequest;
import com.exportimport.backend.DTO.ProductResponse;
import com.exportimport.backend.DTO.Response;
import com.exportimport.backend.entity.Product;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.repository.ProductRepository;
import com.exportimport.backend.repository.UserRepository;
import com.exportimport.backend.service.ProductService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
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

    @PostMapping(
            value = "/{productId}/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestParam("image") MultipartFile imageFile) {
        return productService.uploadImage(productId,imageFile);
    }

    @GetMapping("/{productId}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long productId) {
        try {
            byte[] imageBytes = productService.getProductImage(productId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);  // or dynamically detect if needed
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping
    public Response<?> getAll() {
        return productService.getAllProducts();
    }

    @PutMapping("/update/{id}")
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

