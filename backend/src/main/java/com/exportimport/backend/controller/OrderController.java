package com.exportimport.backend.controller;
import com.exportimport.backend.entity.Order;
import com.exportimport.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    @GetMapping("/user/{importerId}")
    public List<Order> getOrdersByUser(@PathVariable Long importerId) {
        return orderService.getOrdersByUser(importerId);
    }
}
