package com.example.backProject.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.example.backProject.entity.ExerciseImages;
import com.example.backProject.entity.ExerciseLogs;

public interface ExerciseLogsService {
	 public List<ExerciseImages> getAllExercises();
	 public List<ExerciseLogs> getExerciseLogsByDate(String userId, LocalDate date);
	 public void saveExerciseLogs(List<ExerciseLogs> logs);
	 @Transactional
	 public void deleteExerciseLogsByDate(String userId, LocalDate date);
	 public void deleteExerciseLogById(int exerciseId);
	 public List<LocalDate> getExerciseDates(String userId);
}
