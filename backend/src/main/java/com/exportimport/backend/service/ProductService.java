package com.exportimport.backend.service;

import com.exportimport.backend.DTO.ProductRequest;
import com.exportimport.backend.DTO.ProductResponse;
import com.exportimport.backend.DTO.Response;
import com.exportimport.backend.entity.Product;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.repository.ProductRepository;
import com.exportimport.backend.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    @Autowired
    private final ProductRepository productRepo;
    @Autowired
    private final UserRepository userRepo;

    public Response<?> createProduct(ProductRequest request) {

        try{
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
            return new Response<>(200,"Product Registered Successfully",product);
        }
        catch(Exception e){
            return new Response<>(500,"Internal Server Error",null);
        }
    }

    public Response<?> getAllProducts() {
        List<ProductResponse> productResponseList = new ArrayList<>();
        productResponseList = productRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return new Response<>(200,"Product Fetched successfully",productResponseList);
    }

    public Response<?> updateProduct(Long id, ProductRequest request) {
        try{
            Optional<Product> existingProduct = productRepo.findById(id);
            if(existingProduct.isEmpty()){
                return new Response<>(400,"File not found",null);
            }
            Product product = existingProduct.get();
            product.setName(request.getName());
            product.setHsCode(request.getHsCode());
            product.setOriginCountry(request.getOriginCountry());
            product.setWeight(request.getWeight());
            product.setValue(request.getValue());
            product.setQuantity(request.getQuantity());
            productRepo.save(product);

            return new Response<>(200,"Update successfully",null);
        }
        catch(Exception e){
            return new Response<>(500,"Internal Server Error",null);
        }
    }

    public Response<?> deleteProduct(Long id) {
        try{
            Optional<Product> existingProduct = productRepo.findById(id);
            if(existingProduct.isEmpty()){
                return new Response<>(400,"File not found",null);
            }
            productRepo.deleteById(id);

            return new Response<>(200,"Delete successfully",null);
        }
        catch(Exception e){
            return new Response<>(500,"Internal Server Error",null);
        }
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
                .imageUrl(product.getImageUrl())
                .exporterName(product.getExporter().getName())
                .exporterId(product.getExporter().getId())
                .build();
    }

    public Response<?> getProductsByExporter(Long exporterId) {
        try{
            Optional<User> existingUser = userRepo.findById(exporterId);
            if(existingUser.isEmpty()){
                return new Response<>(400,"User not found",null);
            }
            List<ProductResponse> productList = productRepo.findByExporterId(exporterId)
                    .stream().map(this::mapToResponse).toList();
            return new Response<>(200,"Product Fetched by exporter successfully",productList);
        }
        catch (Exception e){
            return new Response<>(500,"Internal error",null);
        }
    }


    @Autowired
    private FileStorageService fileStorageService;

    public ResponseEntity<?> uploadImage(
            Long productId, MultipartFile imageFile
    ) {
        try {
            // 2. Find product by ID
            Product product = productRepo.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // 4. Save image
            String imageUrl = fileStorageService.saveImage(imageFile);
            product.setImageUrl(imageUrl);

            // 5. Save updated product
            productRepo.save(product);

            return ResponseEntity.ok("Image uploaded successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }



}

