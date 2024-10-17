package com.example.backProject.service;

import com.example.backProject.entity.GrantedPasses;

public interface GrantedPassesService {
	
	public GrantedPasses findUsersById(String userId);
	
	public void decrementUse(String userId);
	
}
