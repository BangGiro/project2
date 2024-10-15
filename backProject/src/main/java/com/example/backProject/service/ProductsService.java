package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.backProject.entity.Products;

public interface ProductsService {

    // 모든 제품 조회
    List<Products> getAllProducts();

    // 검색어로 제품 검색 (공백 제거 후 검색)
    public Page<Products> searchByKeyword(String keyword, Pageable pageable);

    // 모든 제품을 페이징 처리하여 가져오기
    public Page<Products> getProducts(Pageable pageable);

    // 제품 ID로 특정 제품 조회
    Optional<Products> getProductById(int id);

    // 제품 저장
    Products saveProduct(Products product);

    // 제품 ID로 제품 삭제
    void deleteProductById(int id);

    // 카테고리 ID로 제품을 페이징 처리하여 필터링
    public Page<Products> getProductsByCategories(List<Integer> categoryId, Pageable pageable);

    // 검색어와 카테고리로 제품을 페이징 처리하여 필터링
    public Page<Products> getProductsByKeywordAndCategories(String keyword, List<Integer> categories, Pageable pageable);
}
