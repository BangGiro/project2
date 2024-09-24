package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.OrdersRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {
	
	private final OrdersRepository oRepository;
	
	
	
}
