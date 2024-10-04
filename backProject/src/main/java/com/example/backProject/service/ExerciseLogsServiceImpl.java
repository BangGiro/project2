package com.example.backProject.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backProject.entity.ExerciseImages;
import com.example.backProject.entity.ExerciseLogs;
import com.example.backProject.repository.ExerciseImagesRepository;
import com.example.backProject.repository.ExerciseLogsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ExerciseLogsServiceImpl implements ExerciseLogsService{
    private final ExerciseLogsRepository logsRepository;
    private final ExerciseImagesRepository imagesRepository;

    public List<ExerciseImages> getAllExercises() {
        return imagesRepository.findAll();
    }

    public List<ExerciseLogs> getExerciseLogsByDate(String userId, LocalDateTime date) {
        return logsRepository.findByUserIdAndExerciseDate(userId, date);
    }

    public void saveExerciseLogs(List<ExerciseLogs> logs) {
        logsRepository.saveAll(logs);
    }
}
