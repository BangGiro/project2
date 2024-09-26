package com.example.backProject.repository;

import com.example.backProject.entity.Cart;
import com.example.backProject.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUser(Users user);  // 사용자의 장바구니 항목을 가져오기 위한 메서드
}
