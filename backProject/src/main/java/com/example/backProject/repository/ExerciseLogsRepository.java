package com.example.backProject.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.ExerciseLogs;

public interface ExerciseLogsRepository extends JpaRepository<ExerciseLogs, Integer> {

	List<ExerciseLogs> findByUser_UserIdAndExerciseDate(String userId, LocalDateTime exerciseDate);

}
