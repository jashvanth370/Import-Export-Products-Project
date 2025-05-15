package com.exportimport.backend.controller;
import com.exportimport.backend.DTO.OrderRequest;
import com.exportimport.backend.DTO.Response;
import com.exportimport.backend.DTO.ShipmentRequest;
import com.exportimport.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    @PostMapping("/createShipment/{orderId}")
    public Response<?> createShipment(@RequestBody ShipmentRequest request ,
                                      @PathVariable Long orderId) {
        return orderService.createShipment(request,orderId);
    }


}
