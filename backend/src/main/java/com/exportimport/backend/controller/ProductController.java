package com.exportimport.backend.controller;

import com.exportimport.backend.dTo.ProductRequest;
import com.exportimport.backend.dTo.ProductResponse;
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

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    @PostMapping("/add")
    public ProductResponse createProduct(@RequestBody ProductRequest request) {
        if (request.getExporterId() == null) {
            throw new IllegalArgumentException("Exporter ID must not be null");
        }

        User exporter = userRepository.findById(request.getExporterId())
                .orElseThrow(() -> new RuntimeException("Exporter not found"));

        Product product = new Product();
        product.setName(request.getName());
        product.setHsCode(request.getHsCode());
        product.setOriginCountry(request.getOriginCountry());
        product.setWeight(request.getWeight());
        product.setQuantity(request.getQuantity());
        product.setValue(request.getValue());
        product.setExporter(exporter); // 🔗 set relationship

        productRepository.save(product);

        return new ProductResponse(product); // or however you're returning it
    }


    @GetMapping
    public List<ProductResponse> getAll() {
        return productService.getAllProducts();
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/exporter/{exporterId}")
    public List<Product> getProductsByExporter(@PathVariable Long exporterId) {
        System.out.println("Fetching products for exporterId: " + exporterId);
        List<Product> products = productRepository.findByExporterId(exporterId);
        System.out.println("Found " + products.size() + " products");
        return products;
    }

}

