package com.example.backProject.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backProject.entity.ExerciseLogs;

public interface ExerciseLogsRepository extends JpaRepository<ExerciseLogs, Integer> {
    List<ExerciseLogs> findByUserIdAndExerciseDate(String userId, LocalDate exerciseDate);
    void deleteByUserIdAndExerciseDate(String userId, LocalDate date);
    
    @Query("SELECT DISTINCT e.exerciseDate FROM ExerciseLogs e WHERE e.userId = :userId")
    List<LocalDate> findDistinctExerciseDatesByUserId(@Param("userId") String userId);
}
