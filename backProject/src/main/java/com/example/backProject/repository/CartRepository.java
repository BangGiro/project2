package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{
	
}
