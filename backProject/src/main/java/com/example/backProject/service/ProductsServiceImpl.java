package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ProductsServiceImpl implements ProductsService {
	
	private final ProductsRepository pRepository;
	
	
	
}
