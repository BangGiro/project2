package com.example.backProject.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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
	private int orderId;
	@Id
	private String productId;
	
	
	private int quantity;
	private float weight;
	
}
