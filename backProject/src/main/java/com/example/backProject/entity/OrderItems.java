package com.example.backProject.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orderItems")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(OrderItemsId.class)
public class OrderItems implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@ManyToOne(fetch = FetchType.LAZY)  // Order와 연관 관계 설정
	@JoinColumn(name = "order_id", nullable = false)
    private Orders order;
	
	@Id
    @ManyToOne(fetch = FetchType.LAZY)  // Product와 연관 관계 설정
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;
	
	private int quantity;
	private float weight;
	
}
