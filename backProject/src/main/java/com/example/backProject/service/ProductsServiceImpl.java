package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backProject.entity.Products;
import com.example.backProject.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ProductsServiceImpl implements ProductsService {
	
	private final ProductsRepository pRepository;
	

    @Override
    public List<Products> getAllProducts() {
        return pRepository.findAll();
    }

    @Override
    public Optional<Products> getProductById(int id) {
        return pRepository.findById(id);
    }

    @Override
    public Products saveProduct(Products product) {
        return pRepository.save(product);
    }

    @Override
    public void deleteProductById(int id) {
        pRepository.deleteById(id);
    }
	
}
