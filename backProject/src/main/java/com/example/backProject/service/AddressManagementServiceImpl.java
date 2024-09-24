package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.AddressManagementRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AddressManagementServiceImpl implements AddressManagementService {
	
	private final AddressManagementRepository aRepository;
	
	
	
}
