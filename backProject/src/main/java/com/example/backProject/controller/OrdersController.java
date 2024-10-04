package com.example.backProject.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.domain.OrdersDTO;
import com.example.backProject.entity.Orders;
import com.example.backProject.repository.OrdersRepository;
import com.example.backProject.service.OrdersService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrdersController{
	private final OrdersService ordersService;
	private final OrdersRepository oRepository;
	// 주문 생성 API
	@PostMapping("/create")
	public ResponseEntity<String> createOrder(@RequestBody OrdersDTO orderData) {
	    try {
	        Orders order = Orders.builder()
	            .userId(orderData.getUserId())
	            .orderDate(LocalDateTime.now())
	            .quantity(orderData.getQuantity())
	            .totalAmount(orderData.getTotalAmount())
	            .shippingAddress(orderData.getShippingAddress())
	            .deliveryAddress(orderData.getDeliveryAddress())
	            .status("Pending")  // 초기 주문 상태는 'Pending'
	            .build();

	        oRepository.save(order); // 주문 저장
	        return ResponseEntity.ok("Order created successfully!");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create order");
	    }
	}
	
	@GetMapping("/{userId}")
	public List<Orders> getOrders(@PathVariable String userId) {
	    return ordersService.findOrdersByUserId(userId);
	}
	
	 // 주문 삭제 API
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderId) {
        try {
            ordersService.deleteOrderById(orderId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
	
	
	
	}
