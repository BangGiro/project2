package com.example.backProject.service;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;
import java.util.List;

public interface CartService {
    Cart addToCart(CartDTO cartDTO);
    List<Cart> getUserCart(String userId);
    void removeFromCart(int cartId);
}
