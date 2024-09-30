package com.example.backProject.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer>{
		Page<Products> findAll(Pageable pageable);
}
