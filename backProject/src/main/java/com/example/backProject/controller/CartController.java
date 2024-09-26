package com.example.backProject.controller;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;
import com.example.backProject.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Cart>> getUserCart(@PathVariable String userId) {
        List<Cart> cartItems = cartService.getUserCart(userId);
        return ResponseEntity.ok(cartItems);
    }

    // 장바구니 항목 삭제
    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable int cartId) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.noContent().build();
    }
}
