package com.exportimport.backend.controller;
import com.exportimport.backend.DTO.*;
import com.exportimport.backend.entity.Order;
import com.exportimport.backend.entity.ShipmentStatus;
import com.exportimport.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private  OrderService orderService;


    @PostMapping("/createOrder")
    public Response<?> createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }


    @GetMapping("/user/{importerId}")
    public Response<?> getOrdersByUser(@PathVariable Long importerId) {
        return orderService.getOrdersByUser(importerId);
    }

    @GetMapping("/order/{orderId}")
    public Response<?> getOrderById(@PathVariable  Long orderId){
        return orderService.getOrderById(orderId);
    }

    @PostMapping("/{orderId}/shipment")
    public Response<?> createShipment(@RequestBody ShipmentRequest request ,
                                      @PathVariable Long orderId) {
        return orderService.createShipment(request,orderId);
    }

    @PutMapping("/{orderId}/accept")
    public Response<?> acceptOrder(@PathVariable Long orderId) {
        return orderService.updateOrderStatus(orderId, ShipmentStatus.CONFIRMED);
    }

    @PutMapping("/{orderId}/reject")
    public Response<?> rejectOrder(@PathVariable Long orderId) {
        return orderService.updateOrderStatus(orderId, ShipmentStatus.REJECTED);
    }

    @GetMapping("/pending")
    public Response<?> getPendingOrders() {
        return orderService.getPendingOrders();
    }

    @GetMapping("/confirm")
    public Response<?> getConfirmOrders() {
        return orderService.getConfirmOrders();
    }

    @GetMapping("/{exporterId}/{status}")
    public Response<?> getPendingOrdersByExporter(@PathVariable Long exporterId,
                                                  @RequestBody ShipmentStatus status){
        return orderService.getPendingOrderByExporterId(exporterId,status);
    }


    @GetMapping("/exporter/{exporterId}/orders")
    public Response<?> getOrdersByExporter(@PathVariable Long exporterId) {
        return orderService.getOrdersByExporter(exporterId);
    }

    @GetMapping("/pending/exporter/{exporterId}")
    public ResponseEntity<?> getPendingOrdersByExporter(@PathVariable Long exporterId) {
        List<Order> pendingOrders = orderService.getPendingOrdersByExporterId(exporterId);
        return ResponseEntity.ok(Map.of("data", pendingOrders));
    }




    @GetMapping("/{id}/shipment")
    public ResponseEntity<ApiResponse<ShipmentResponse>> getShipment(
            @PathVariable("id") Long orderId
    ) {
        ShipmentResponse shipment = orderService.getShipmentDetails(orderId);
        return ResponseEntity.ok(ApiResponse.success(shipment));
    }


}
