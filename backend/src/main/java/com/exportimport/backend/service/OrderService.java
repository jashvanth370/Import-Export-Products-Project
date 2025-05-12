package com.exportimport.backend.service;
import com.exportimport.backend.entity.Order;
import com.exportimport.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private final OrderRepository orderRepo;

    public OrderService(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order placeOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        return orderRepo.save(order);
    }

    public List<Order> getOrdersByUser(Long importerId) {
        return orderRepo.findByImporterId(importerId);
    }
}
