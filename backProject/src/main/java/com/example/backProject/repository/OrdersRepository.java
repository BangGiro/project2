package com.example.backProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer>{
	List<Orders> findByUserId(String userId);
}
