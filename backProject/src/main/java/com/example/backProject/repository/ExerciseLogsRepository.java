package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.ExerciseLogs;

public interface ExerciseLogsRepository extends JpaRepository<ExerciseLogs, Integer>{
	
}
