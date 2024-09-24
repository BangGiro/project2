package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.OrderItemsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class OrderItemsServiceImpl implements OrderItemsService {
	
	private final OrderItemsRepository oRepository;
	
	
	
}
