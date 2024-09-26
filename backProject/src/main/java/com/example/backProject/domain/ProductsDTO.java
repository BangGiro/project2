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
public class ProductsDTO {
	
	//멤버 변수
	private int productId;
	private String productName;
	private String description;
	private double price;
	private int stockQuantity;
	private int categoryId;
	private String brand;
	private double weight;
	private double shippingCost;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private String productsImages;
}
