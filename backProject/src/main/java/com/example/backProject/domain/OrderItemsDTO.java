package com.example.backProject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderItemsDTO {
	
	//멤버 변수
	private int orderId;
	private String productId;
	private int quantity;
	private float weight;
	
}
