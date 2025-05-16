package com.exportimport.backend.repository;

import com.exportimport.backend.entity.Order;
import com.exportimport.backend.entity.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByImporterId(Long importerId);

    List<Order> findByStatus(ShipmentStatus status);

    List<Order> findByExporterId(Long exporterId);


}
