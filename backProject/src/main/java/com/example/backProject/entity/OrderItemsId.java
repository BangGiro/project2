package com.example.backProject.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemsId implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private int orderId;
	private String productId;
	
}
