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
	
	public Page<Products> getProductsByCategories(List<Integer> categoryIds, Pageable pageable) {
	    return pRepository.findByCategoryCategoryIdIn(categoryIds, pageable);
	}

	
	@Override
	public List<Products> getAllProducts() {
		return pRepository.findAll();
	}
	@Override
	public Page<Products> searchByKeyword(String keyword, Pageable pageable) {
	    // 검색어에서 공백 제거
	    String sanitizedKeyword = keyword.replaceAll("\\s+", "");

	    // 공백을 제거한 검색어로 검색 수행
	    return pRepository.searchByKeywordWithoutSpaces(sanitizedKeyword, pageable);
	}

	@Override
	public Page<Products> getProducts(Pageable pageable) {
        return pRepository.findAll(pageable);
    }

	
	@Override
	public Optional<Products> getProductById(int productId) {
		return pRepository.findById(productId);
	}

	@Override
	public Products saveProduct(Products product) {
		return pRepository.save(product);
	}

	@Override
	public void deleteProductById(int id) {
		pRepository.deleteById(id);
	}

}
