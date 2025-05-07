package com.exportimport.backend.repository;

import com.exportimport.backend.model.ShipmentStatus;
import com.exportimport.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByStatus(ShipmentStatus status);
}
