package com.example.backProject.service;

import java.time.LocalDateTime;
import java.util.List;

import com.example.backProject.entity.ExerciseLogs;
import com.example.backProject.entity.Users;

public interface ExerciseLogsService {
	public List<ExerciseLogs> getExerciseLogsByDate(String userId, LocalDateTime date);
	
	public void saveExerciseLog(ExerciseLogs exerciseLog);
}
