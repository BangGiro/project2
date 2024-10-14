package com.example.backProject.service;

import java.util.List;

import com.example.backProject.entity.Passes;

public interface PassesService {
	
	public List<Passes> findByUserId(String userId);
	
}
