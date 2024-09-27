package com.example.backProject.service;

import java.util.List;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;

public interface CartService {
    Cart addToCart(CartDTO cartDTO);
    List<CartDTO> getUserCart(String userId);
    void removeFromCart(int cartId);
}
