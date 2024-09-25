package com.example.backProject.domain;

import com.example.backProject.entity.Orders;
import com.example.backProject.entity.Products;

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
	private Orders order;
	private Products product;
	private int quantity;
	private float weight;
	
}
