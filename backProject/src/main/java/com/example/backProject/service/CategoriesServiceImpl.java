package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.CategoriesRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class CategoriesServiceImpl implements CategoriesService {
	
	private final CategoriesRepository cRepository;
	
	
	
}
