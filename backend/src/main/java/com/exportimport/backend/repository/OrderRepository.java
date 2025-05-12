package com.exportimport.backend.repository;

import com.exportimport.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByImporterId(Long importerId);
}
