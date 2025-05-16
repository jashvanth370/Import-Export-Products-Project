package com.exportimport.backend.service;
import com.exportimport.backend.DTO.*;
import com.exportimport.backend.entity.Order;
import com.exportimport.backend.entity.ShipmentStatus;
import com.exportimport.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private  OrderRepository orderRepo;


    public Response<?> createOrder(OrderRequest request) {
        try{
            Order order = Order.builder()
                    .importerId(request.getImporterId())
                    .productId(request.getProductId())
                    .status(ShipmentStatus.PENDING)
                    .orderDate(LocalDateTime.now())
                    .shippingAddress(request.getShippingAddress())
                    .quantity(request.getQuantity())
                    .exporterId(request.getExporterId())
                    .build();
            orderRepo.save(order);
            return new Response<>(200,"Order Create successfully",null);
        }
        catch(Exception e){
            return new Response<>(500,"Internal error",null);
        }
    }

    public Response<?> getOrdersByUser(Long importerId) {
        try{
            List<Order> existingUser = orderRepo.findByImporterId(importerId);
            if(existingUser.isEmpty()){
                return new Response<>(400,"User not found",null);
            }
            List<Order> productList = orderRepo.findByImporterId(importerId)
                    .stream().collect(Collectors.toList());
            return new Response<>(200,"Product Fetched by Importer successfully",productList);
        }
        catch (Exception e){
            return new Response<>(500,"Internal error",null);
        }
    }

    public Response<?> getOrderById(Long orderId){
        try {
            Optional<Order> orderExisting = orderRepo.findById(orderId);
            if(orderExisting.isEmpty()){
                return new Response<>(400,"Order not found",null);
            }
            Order order = orderRepo.findById(orderId).get();
            return new Response<>(200,"Order fetched successfully",order);
        }
        catch (Exception e){
            return new Response<>(500,"Internal error",null);
        }
    }

    public Response<?> createShipment(ShipmentRequest request ,Long orderId) {
        try {
            Optional<Order> orderExisting = orderRepo.findById(orderId);
            if (orderExisting.isEmpty()) {
                return new Response<>(400, "Order not found", null);
            }

            if (request.getShipmentDate() == null || request.getTrackingNumber() == null) {
                return new Response<>(400, "Missing shipment date or tracking number", null);
            }

            Order order = orderExisting.get();
            order.setShipmentDate(request.getShipmentDate());
            order.setTrackingNumber(request.getTrackingNumber());
            order.setStatus(ShipmentStatus.CONFIRMED);

            orderRepo.save(order);
            return new Response<>(200, "Shipment created successfully", null);

        } catch (Exception e) {
            e.printStackTrace(); // log this for debugging
            return new Response<>(500, "Internal error", null);
        }
    }

    public Response<?> updateOrderStatus(Long orderId, ShipmentStatus status) {
        try {
            Optional<Order> optionalOrder = orderRepo.findById(orderId);
            if (optionalOrder.isEmpty()) {
                return new Response<>(404, "Order not found", null);
            }

            Order order = optionalOrder.get();
            order.setStatus(status);
            orderRepo.save(order);

            return new Response<>(200, "Order status updated to " + status.name(), order);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(500, "Internal server error", null);
        }
    }

    public Response<?> getPendingOrders() {
        try {
            List<Order> pendingOrders = orderRepo.findByStatus(ShipmentStatus.PENDING);
            return new Response<>(200, "Pending orders fetched", pendingOrders);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(500, "Failed to fetch pending orders", null);
        }
    }

    public Response<?> getOrdersByExporter(Long exporterId) {
        try {
            List<Order> orders = orderRepo.findByExporterId(exporterId);
            return new Response<>(200, "Orders fetched for exporter", orders);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(500, "Error fetching orders", null);
        }
    }


    public Response<?> getConfirmOrders() {
        try {
            List<Order> confirmOrders = orderRepo.findByStatus(ShipmentStatus.CONFIRMED);
            return new Response<>(200, "Confirm orders fetched", confirmOrders);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(500, "Failed to fetch confirm orders", null);
        }
    }
}
