package com.example.backProject.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrdersDTO {
	
	//멤버 변수
	private int orderId;
	private String userId;
	private LocalDateTime orderDate;
	private double totalAmount;
	private String shippingAddress;
	private String status;
	private String deliveryAddress;
	
}
