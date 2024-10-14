package com.example.backProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.Passes;

public interface PassesRepository extends JpaRepository<Passes, Integer>{
	
	List<Passes> findByUserId(String UserId);
	
}
