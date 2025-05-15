package com.exportimport.backend;

import com.exportimport.backend.entity.Order;
import com.exportimport.backend.entity.ShipmentStatus;
import com.exportimport.backend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledShipmentUpdater {

    @Autowired
    private OrderRepository orderRepository;

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Colombo") // Runs every day at midnight
    @Transactional
    public void updateShipmentStatusAfter7Days() {
        List<Order> confirmedOrders = orderRepository.findByStatus(ShipmentStatus.CONFIRMED);

        LocalDateTime now = LocalDateTime.now();

        for (Order order : confirmedOrders) {
            if (order.getShipmentDate() != null && order.getShipmentDate().plusDays(7).isBefore(now)) {
                order.setStatus(ShipmentStatus.SHIPPED);
                orderRepository.save(order);
                System.out.println("Order ID " + order.getId() + " updated to SHIPPED.");
            }
        }
    }
}
