package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backProject.entity.Products;
import com.example.backProject.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductsServiceImpl implements ProductsService {

    private final ProductsRepository pRepository;

    // 카테고리로 필터링된 제품 가져오기
    public Page<Products> getProductsByCategories(List<Integer> categoryIds, Pageable pageable) {
        return pRepository.findByCategoryCategoryIdIn(categoryIds, pageable);
    }

    // 카테고리와 키워드로 필터링된 제품 가져오기
    public Page<Products> getProductsByKeywordAndCategories(String keyword, List<Integer> categories, Pageable pageable) {
        return pRepository.findByKeywordAndCategories(keyword, categories, pageable);
    }

    // 전체 제품 목록 조회
    @Override
    public List<Products> getAllProducts() {
        return pRepository.findAll();
    }

    // 검색어로 제품 검색
    @Override
    public Page<Products> searchByKeyword(String keyword, Pageable pageable) {
        // 검색어에서 공백 제거
        String sanitizedKeyword = keyword.replaceAll("\\s+", "");

        // 공백을 제거한 검색어로 검색 수행
        return pRepository.searchByKeywordWithoutSpaces(sanitizedKeyword, pageable);
    }

    // 페이징 처리된 전체 제품 목록 조회
    @Override
    public Page<Products> getProducts(Pageable pageable) {
        return pRepository.findAll(pageable);
    }

    // 제품 ID로 특정 제품 조회
    @Override
    public Optional<Products> getProductById(int productId) {
        return pRepository.findById(productId);
    }

    // 제품 저장
    @Override
    public Products saveProduct(Products product) {
        return pRepository.save(product);
    }

    // 제품 ID로 제품 삭제
    @Override
    public void deleteProductById(int id) {
        pRepository.deleteById(id);
    }
}
