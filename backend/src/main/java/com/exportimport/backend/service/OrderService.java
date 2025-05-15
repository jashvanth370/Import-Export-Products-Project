package com.exportimport.backend.service;
import com.exportimport.backend.DTO.*;
import com.exportimport.backend.entity.Order;
import com.exportimport.backend.entity.ShipmentStatus;
import com.exportimport.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public Response<?> createShipment(ShipmentRequest request , Long orderId) {
        try{
            Optional<Order> orderExisting = orderRepo.findById(orderId);
            if(orderExisting.isEmpty()){
                return new Response<>(400,"Order not found",null);
            }
            Order order = orderExisting.get();
            order.setShipmentDate(request.getShipmentDate());
            order.setTrackingNumber(request.getTrackingNumber());
            order.setStatus(ShipmentStatus.CONFIRMED);
            return new Response<>(200,"Shipment Create successfully",null);
        }
        catch(Exception e){
            return new Response<>(500,"Internal error",null);
        }
    }




}
