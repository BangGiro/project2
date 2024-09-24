package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.OrderItems;
import com.example.backProject.entity.OrderItemsId;

public interface OrderItemsRepository extends JpaRepository<OrderItems, OrderItemsId>{
	
}
