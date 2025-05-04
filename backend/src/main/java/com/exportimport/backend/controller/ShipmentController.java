package com.exportimport.backend.controller;

import com.exportimport.backend.dto.ShipmentRequest;
import com.exportimport.backend.dto.ShipmentResponse;
import com.exportimport.backend.model.ShipmentStatus;
import com.exportimport.backend.service.ShipmentService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ShipmentController {

    private final ShipmentService shipmentService;

    @PostMapping
    public ShipmentResponse create(@RequestBody ShipmentRequest request) {
        return shipmentService.createShipment(request);
    }

    @GetMapping
    public List<ShipmentResponse> getAll() {
        return shipmentService.getAllShipments();
    }

    @PutMapping("/{id}/status")
    public ShipmentResponse updateStatus(@PathVariable Long id, @RequestParam ShipmentStatus status) {
        return shipmentService.updateStatus(id, status);
    }
}
