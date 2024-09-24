package com.example.backProject.repository;

import java.util.List;

import com.example.backProject.entity.Users;

public interface UsersRepository {
	List<Users> findById();
	
	Users selectOne(String id);
}
