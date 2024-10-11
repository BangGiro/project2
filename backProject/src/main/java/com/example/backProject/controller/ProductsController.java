package com.example.backProject.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.entity.Products;
import com.example.backProject.exception.ResourceNotFoundException;
import com.example.backProject.service.ProductsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductsController {

	private final ProductsService productsService;

	@GetMapping("/categories")
    public ResponseEntity<Page<Products>> getProductsByCategory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) List<Integer> categories) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Products> products = productsService.getProductsByCategories(categories != null ? categories : List.of(), pageable);
        return ResponseEntity.ok(products);
    }
	
	// 모든 제품 조회
	@GetMapping
	public ResponseEntity<List<Products>> getAllProducts() {
		List<Products> products = productsService.getAllProducts();
		return ResponseEntity.ok(products);
	}


	//페이징 적용
	@GetMapping("/paging")
	public ResponseEntity<Page<Products>> getProducts(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @RequestParam(required = false) String keyword,
	        @RequestParam(required = false) List<Integer> categories) {

	    Pageable pageable = PageRequest.of(page, size);
	    Page<Products> productsPage;

	    if (categories != null && !categories.isEmpty()) {
	        // 카테고리가 선택된 경우 해당 카테고리로 필터링
	        productsPage = productsService.getProductsByCategories(categories, pageable);
	    } else if (keyword != null && !keyword.isEmpty()) {
	        // 검색어가 있을 경우 검색 결과에 대한 페이징 처리
	        productsPage = productsService.searchByKeyword(keyword, pageable);
	    } else {
	        // 검색어와 카테고리가 없을 경우 모든 제품 페이징 처리
	        productsPage = productsService.getProducts(pageable);
	    }

	    return ResponseEntity.ok(productsPage);
	}

	// ID로 제품 조회
	@GetMapping("/{id}")
	public ResponseEntity<Products> getProductById(@PathVariable int id) {
		Optional<Products> product = productsService.getProductById(id);
		return product.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	// 새 제품 생성
	@PostMapping
	public ResponseEntity<Products> createProduct(@RequestBody Products product) {
		Products savedProduct = productsService.saveProduct(product);
		return ResponseEntity.ok(savedProduct);
	}

	// 기존 제품 수정
	@PutMapping("/{id}")
	public ResponseEntity<Products> updateProduct(@PathVariable int id, @RequestBody Products productDetails) {
		Optional<Products> product = productsService.getProductById(id);

		if (product.isPresent()) {
			Products updatedProduct = product.get();
			updatedProduct.setProductName(productDetails.getProductName());
			updatedProduct.setDescription(productDetails.getDescription());
			updatedProduct.setPrice(productDetails.getPrice());
			updatedProduct.setStockQuantity(productDetails.getStockQuantity());
			updatedProduct.setBrand(productDetails.getBrand());
			updatedProduct.setWeight(productDetails.getWeight());
			updatedProduct.setShippingCost(productDetails.getShippingCost());

			Products savedProduct = productsService.saveProduct(updatedProduct);
			return ResponseEntity.ok(savedProduct);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 제품 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
		productsService.deleteProductById(id);
		return ResponseEntity.noContent().build();
	}
}
