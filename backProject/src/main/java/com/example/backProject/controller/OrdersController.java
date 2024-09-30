package com.example.backProject.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	}
