package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backProject.entity.Products;

public interface ProductsService {
	List<Products> getAllProducts();               // 모든 제품 조회
	public Page<Products> searchByKeyword(String keyword, Pageable pageable);
	public Page<Products> getProducts(Pageable pageable);              // 모든 제
    Optional<Products> getProductById(int id);     // ID로 제품 조회
    Products saveProduct(Products product);        // 제품 저장
    void deleteProductById(int id);                // ID로 제품 삭제
    public Page<Products> getProductsByCategories(List<Integer> categoryId, Pageable pageable);
    
}
