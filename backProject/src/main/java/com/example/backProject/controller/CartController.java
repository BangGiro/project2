package com.example.backProject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;
import com.example.backProject.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    // 장바구니에 제품 추가
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody CartDTO cartDTO) {
        Cart addedCart = cartService.addToCart(cartDTO);
        return ResponseEntity.ok(addedCart);
    }

    // 사용자 ID로 장바구니 항목 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getUserCart(@PathVariable String userId) {  // userId 타입 유지
        List<CartDTO> cartItems = cartService.getUserCart(userId);
        return ResponseEntity.ok(cartItems);
    }

    // 장바구니 항목 삭제
    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable int cartId) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.noContent().build();
    }
}
