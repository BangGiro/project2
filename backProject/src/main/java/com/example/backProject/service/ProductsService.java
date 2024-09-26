package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import com.example.backProject.entity.Products;

public interface ProductsService {
	List<Products> getAllProducts();               // 모든 제품 조회
    Optional<Products> getProductById(int id);     // ID로 제품 조회
    Products saveProduct(Products product);        // 제품 저장
    void deleteProductById(int id);                // ID로 제품 삭제
}
