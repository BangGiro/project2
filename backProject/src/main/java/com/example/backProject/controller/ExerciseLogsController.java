package com.example.backProject.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return exerciseService.getExerciseLogsByDate(userId, date);
    }

    @PutMapping("/logs")
    public ResponseEntity<?> saveExerciseLogs(@RequestBody List<ExerciseLogs> logs) {
        try {
            logs.forEach(log -> {
                if (log.getExerciseDate() == null) {
                    throw new IllegalArgumentException("Exercise date is required");
                }
            });
            exerciseService.saveExerciseLogs(logs);
            return ResponseEntity.ok("운동 기록 저장 완료");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("운동 기록 저장에 실패했습니다: " + e.getMessage());
        }
    }
    
    // DELETE 요청 핸들러
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteExerciseLogs(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            exerciseService.deleteExerciseLogsByDate(userId, date);
            return ResponseEntity.ok("운동 기록이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("운동 기록 삭제에 실패했습니다: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/logs/{exerciseId}")
    public ResponseEntity<?> deleteExerciseLogById(@PathVariable int exerciseId) {
        try {
            exerciseService.deleteExerciseLogById(exerciseId);
            return ResponseEntity.ok("운동 기록이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("운동 기록 삭제에 실패했습니다: " + e.getMessage());
        }
    }
}
