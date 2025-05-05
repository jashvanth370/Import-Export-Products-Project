package com.exportimport.backend.repository;

import com.exportimport.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;

public interface ProductRepository extends JpaRepository<Product,Long> {

    Arrays findByExporterId(Long exporterId);

}
