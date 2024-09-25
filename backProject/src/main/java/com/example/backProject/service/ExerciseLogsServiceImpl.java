package com.example.backProject.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backProject.entity.ExerciseLogs;
import com.example.backProject.repository.ExerciseLogsRepository;
import com.example.backProject.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ExerciseLogsServiceImpl implements ExerciseLogsService {
	
	private final ExerciseLogsRepository eRepository;
	
	private final  UsersRepository userRepository;
	
	public List<ExerciseLogs> getExerciseLogsByDate(String userId, LocalDateTime date) {
        return eRepository.findByUserIdAndExerciseDate(userId, date);
    }

    public void saveExerciseLog(ExerciseLogs exerciseLog) {
        eRepository.save(exerciseLog);
    }
}
	