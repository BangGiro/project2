package com.example.backProject.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backProject.entity.ExerciseLogs;

public interface ExerciseLogsRepository extends JpaRepository<ExerciseLogs, Integer> {

    // userId와 exerciseDate로 운동 기록 조회
    List<ExerciseLogs> findByUserIdAndExerciseDate(String userId, LocalDateTime exerciseDate);
}
