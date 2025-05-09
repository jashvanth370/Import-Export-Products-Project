package com.exportimport.backend.controller;

import com.exportimport.backend.entity.Product;
import com.exportimport.backend.entity.Transaction;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.repository.ProductRepository;
import com.exportimport.backend.repository.TransactionRepository;
import com.exportimport.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // If using React on port 3000
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }


    @PutMapping("/products/{id}/approve")
    public ResponseEntity<String> approveProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            p.setStatus("APPROVED");
            productRepository.save(p);
            return ResponseEntity.ok("Product approved");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }


    @PutMapping("/products/{id}/reject")
    public ResponseEntity<String> rejectProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            p.setStatus("REJECTED");
            productRepository.save(p);
            return ResponseEntity.ok("Product rejected");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }


    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }


    @PutMapping("/transactions/{id}/approve")
    public ResponseEntity<String> approveTransaction(@PathVariable Long id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()) {
            Transaction t = transaction.get();
//            t.setStatus("COMPLETED");
            transactionRepository.save(t);
            return ResponseEntity.ok("Transaction approved");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
    }


    @GetMapping("/reports")
    public Map<String, Object> getReports() {
        Map<String, Object> reports = new HashMap<>();

        reports.put("approvedProducts", productRepository.findByStatus("APPROVED").size());
        reports.put("rejectedProducts", productRepository.findByStatus("REJECTED").size());

        return reports;
    }
}
