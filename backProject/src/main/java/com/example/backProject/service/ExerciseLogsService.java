package com.example.backProject.service;

import java.time.LocalDateTime;
import java.util.List;

import com.example.backProject.entity.ExerciseImages;
import com.example.backProject.entity.ExerciseLogs;

public interface ExerciseLogsService {
	 public List<ExerciseImages> getAllExercises();
	 public List<ExerciseLogs> getExerciseLogsByDate(String userId, LocalDateTime date);
	 public void saveExerciseLogs(List<ExerciseLogs> logs);
	 
}
