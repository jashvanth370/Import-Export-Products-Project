// com.exportimport.service.ShipmentService.java
package com.exportimport.backend.service;

import com.exportimport.backend.dTo.ShipmentItemRequest;
import com.exportimport.backend.dTo.ShipmentRequest;
import com.exportimport.backend.dTo.ShipmentResponse;
import com.exportimport.backend.entity.*;
import com.exportimport.backend.repository.ProductRepository;
import com.exportimport.backend.repository.ShipmentItemRepository;
import com.exportimport.backend.repository.ShipmentRepository;
import com.exportimport.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class    ShipmentService {

    private final ShipmentRepository shipmentRepo;
    private final ShipmentItemRepository itemRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    public ShipmentResponse createShipment(ShipmentRequest request) {
        User exporter = userRepo.findById(request.getExporterId())
                .orElseThrow(() -> new RuntimeException("Exporter not found"));

        User importer = userRepo.findById(request.getImporterId())
                .orElseThrow(() -> new RuntimeException("Importer not found"));

        Shipment shipment = Shipment.builder()
                .createdAt(LocalDateTime.now())
                .status(ShipmentStatus.PENDING)
                .exporter(exporter)
                .importer(importer)
                .build();

        List<ShipmentItem> items = new ArrayList<>();

        for (ShipmentItemRequest itemReq : request.getItems()) {
            Product product = productRepo.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            ShipmentItem item = ShipmentItem.builder()
                    .shipment(shipment)
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .build();
            items.add(item);
        }

        shipment.setItems(items);
        shipmentRepo.save(shipment); // cascade saves items too

        return mapToResponse(shipment);
    }

    public List<ShipmentResponse> getAllShipments() {
        return shipmentRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ShipmentResponse updateStatus(Long shipmentId, ShipmentStatus status) {
        Shipment shipment = shipmentRepo.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
        shipment.setStatus(status);
        return mapToResponse(shipmentRepo.save(shipment));
    }

    private ShipmentResponse mapToResponse(Shipment s) {
        return ShipmentResponse.builder()
                .id(s.getId())
                .exporterName(s.getExporter().getName())
                .importerName(s.getImporter().getName())
                .productNames(s.getItems().stream().map(i -> i.getProduct().getName()).toList())
                .status(s.getStatus())
                .createdAt(s.getCreatedAt())
                .build();
    }
}

