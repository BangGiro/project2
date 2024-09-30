package com.example.backProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.Users;


public interface UsersRepository extends JpaRepository<Users, String> {
	
	List<Users> findByTrainerId(String trainerId);
	
}
