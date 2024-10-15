package com.example.backProject.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backProject.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

    // 페이징 처리된 전체 제품 조회
    Page<Products> findAll(Pageable pageable);

    // 제품 이름으로 대소문자 구분 없이 검색
    Page<Products> findByProductNameContainingIgnoreCase(String productName, Pageable pageable);

    // 카테고리 ID로 상품을 필터링
    Page<Products> findByCategoryCategoryIdIn(List<Integer> categoryId, Pageable pageable);

    // 공백을 제거한 후 검색어와 일치하는 제품 조회
    @Query("SELECT p FROM Products p WHERE REPLACE(LOWER(p.productName), ' ', '') LIKE LOWER(CONCAT('%', REPLACE(:productName, ' ', ''), '%'))")
    Page<Products> searchByKeywordWithoutSpaces(@Param("productName") String productName, Pageable pageable);

    // 카테고리와 검색어를 동시에 만족하는 제품 조회
    @Query("SELECT p FROM Products p WHERE "
         + "(LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR :keyword IS NULL) "
         + "AND (:categories IS NULL OR p.category.categoryId IN :categories)")
    Page<Products> findByKeywordAndCategories(@Param("keyword") String keyword,
                                              @Param("categories") List<Integer> categories,
                                              Pageable pageable);
}
