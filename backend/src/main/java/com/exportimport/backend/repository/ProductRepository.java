package com.exportimport.backend.repository;

import com.exportimport.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Arrays findByExporterId(Long exporterId);

    List<Product> findByStatus(String status);

}
