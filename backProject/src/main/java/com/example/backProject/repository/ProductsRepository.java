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

    // 카테고리 ID로 제품 목록 조회
    List<Products> findByCategory_CategoryId(int categoryId); // 중복 없이 추가

    // 공백을 제거한 후 검색어와 일치하는 제품 조회
    @Query("SELECT p FROM Products p WHERE REPLACE(LOWER(p.productName), ' ', '') LIKE LOWER(CONCAT('%', REPLACE(:productName, ' ', ''), '%'))")
    Page<Products> searchByKeywordWithoutSpaces(@Param("productName") String productName, Pageable pageable);
}
