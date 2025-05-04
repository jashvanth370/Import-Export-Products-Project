package com.exportimport.backend.repository;

import com.exportimport.backend.model.ShipmentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentItemRepository extends JpaRepository<ShipmentItem,Long> {
}
