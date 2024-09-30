package com.example.backProject.service;

import com.example.backProject.domain.OrdersDTO;
import com.example.backProject.entity.Orders;
import com.example.backProject.repository.OrdersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;

    @Override
    public OrdersDTO createOrder(OrdersDTO ordersDTO) {
        // DTO -> Entity 변환
        Orders orderEntity = Orders.builder()
                .userId(ordersDTO.getUserId())
                .orderDate(ordersDTO.getOrderDate())
                .totalAmount(ordersDTO.getTotalAmount())
                .shippingAddress(ordersDTO.getShippingAddress())
                .status(ordersDTO.getStatus())
                .deliveryAddress(ordersDTO.getDeliveryAddress())
                .build();

        // Entity 저장
        Orders savedOrder = ordersRepository.save(orderEntity);

        // Entity -> DTO 변환하여 반환
        return OrdersDTO.builder()
                .orderId(savedOrder.getOrderId())
                .userId(savedOrder.getUserId())
                .orderDate(savedOrder.getOrderDate())
                .totalAmount(savedOrder.getTotalAmount())
                .shippingAddress(savedOrder.getShippingAddress())
                .status(savedOrder.getStatus())
                .deliveryAddress(savedOrder.getDeliveryAddress())
                .build();
    }
}
