package com.example.backProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;
public interface CartRepository extends JpaRepository<Cart, Integer> {
	@Query("SELECT new com.example.backProject.domain.CartDTO(" +
	           "c.cartId, c.userId, c.createdAt, c.productId, p.productName, p.price, p.productsImages, p.updatedAt)" +
	           " FROM Cart c, Products p" +  // 여기서는 JOIN을 하지 않고 FROM절에서 두 테이블을 가져옴
	           " WHERE c.productId = p.productId AND c.userId = :userId")
    List<CartDTO> findByUserId(String userId);  // 사용자의 장바구니 항목을 가져오기 위한 메서드
}
