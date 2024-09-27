package com.example.backProject.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CartDTO {
	
	//멤버 변수
	private int cartId;
	private String userId;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd    HH:mm")
	private LocalDateTime createdAt;
	private int productId;
	private String productName;
    private double price;
    private String productsImages;
    private LocalDateTime updatedAt;
	public CartDTO(int cartId, String userId, LocalDateTime createdAt, int productId, String productName, double price,
			String productsImages, LocalDateTime updatedAt) {
		super();
		this.cartId = cartId;
		this.userId = userId;
		this.createdAt = createdAt;
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.productsImages = productsImages;
		this.updatedAt = updatedAt;
	}
    
    
}
