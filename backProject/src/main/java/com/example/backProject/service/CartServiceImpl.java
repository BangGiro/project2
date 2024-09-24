package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.CartRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
	
	private final CartRepository cRepository;
	
	
	
}
