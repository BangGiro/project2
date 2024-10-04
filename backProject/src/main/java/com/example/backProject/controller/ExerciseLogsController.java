package com.example.backProject.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.entity.ExerciseImages;
import com.example.backProject.entity.ExerciseLogs;
import com.example.backProject.service.ExerciseLogsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseLogsController{
	private final ExerciseLogsService exerciseService;

    @GetMapping("/images")
    public List<ExerciseImages> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/logs")
    public List<ExerciseLogs> getExerciseLogs(
            @RequestParam String userId, 
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        return exerciseService.getExerciseLogsByDate(userId, date);
    }

    @PostMapping("/logs")
    public ResponseEntity<?> saveExerciseLogs(@RequestBody List<ExerciseLogs> logs) {
        logs.forEach(log -> {
            // exerciseDate가 null인지 체크하여 로깅 또는 예외 처리
            if (log.getExerciseDate() == null) {
                throw new IllegalArgumentException("Exercise date is required");
            }
        });
        exerciseService.saveExerciseLogs(logs);
        return ResponseEntity.ok("운동 기록 저장 완료");
    }
}
