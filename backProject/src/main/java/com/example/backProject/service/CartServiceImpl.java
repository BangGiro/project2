package com.example.backProject.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;
import com.example.backProject.entity.Users;
import com.example.backProject.repository.CartRepository;
import com.example.backProject.repository.ProductsRepository;
import com.example.backProject.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductsRepository productRepository;
    private final UsersRepository userRepository; // User 정보를 가져오기 위해 필요

    @Override
    public Cart addToCart(CartDTO cartDTO) {
        Users user = userRepository.findById(cartDTO.getUser().getUserId()).orElseThrow();
        Cart cart = Cart.builder()
                .user(user)
                .createdAt(cartDTO.getCreatedAt())
                .build();
        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getUserCart(String userId) {
        Users user = userRepository.findById(userId).orElseThrow();
        return cartRepository.findByUser(user);
    }

    @Override
    public void removeFromCart(int cartId) {
        cartRepository.deleteById(cartId);
    }
}
