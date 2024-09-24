package com.example.backProject.service;

import java.util.List;

import com.example.backProject.entity.Users;

public interface UserService {
	List<Users> selectName();
	
	Users selectOne(String id);
}
