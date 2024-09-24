package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Integer>{
	
}
