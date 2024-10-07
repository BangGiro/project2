package com.example.backProject.service;

import java.util.List;

import com.example.backProject.entity.Users;

public interface UserService {
	
	public Users findUsersById(String userId);

	public List<Users> findByTrainerId(String TrainerId);
	
	public Users updateTrainerId(String userId);
	
}
