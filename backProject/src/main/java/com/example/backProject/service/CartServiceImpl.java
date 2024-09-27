package com.example.backProject.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backProject.domain.CartDTO;
import com.example.backProject.entity.Cart;
import com.example.backProject.repository.CartRepository;
import com.example.backProject.repository.ProductsRepository;
import com.example.backProject.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductsRepository productRepository;
    private final UsersRepository userRepository;

    @Override
    public Cart addToCart(CartDTO cartDTO) {
        Cart cart = new Cart();
        cart.setUserId(cartDTO.getUserId()); // userId 설정
        cart.setProductId(cartDTO.getProductId()); // productId 설정
        cart.setCreatedAt(LocalDateTime.now()); // 생성 시간 설정

        return cartRepository.save(cart);
    }

    @Override
    public List<CartDTO> getUserCart(String userId) {  // String userId 그대로 사용
        		
        return cartRepository.findByUserId(userId);
    }

    @Override
    public void removeFromCart(int cartId) {
        cartRepository.deleteById(cartId);
    }
    
    
}
