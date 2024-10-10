package com.example.backProject.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<ExerciseLogs> getExerciseLogsByDate(String userId, LocalDate date) {
        return logsRepository.findByUserIdAndExerciseDate(userId, date);
    }

    @Transactional
    public void saveExerciseLogs(List<ExerciseLogs> logs) {
        for (ExerciseLogs log : logs) {
            // 기록이 이미 있는 경우 업데이트, 없는 경우 새로 저장
            if (log.getExerciseId() != 0 && logsRepository.existsById(log.getExerciseId())) {
                ExerciseLogs existingLog = logsRepository.findById(log.getExerciseId())
                        .orElseThrow(() -> new IllegalArgumentException("해당 운동 기록을 찾을 수 없습니다."));
                
                // 기존 기록을 업데이트
                existingLog.setWeightUsed(log.getWeightUsed());
                existingLog.setReps(log.getReps());
                existingLog.setSets(log.getSets());
                existingLog.setExerciseDate(log.getExerciseDate());
                existingLog.setImageId(log.getImageId());
                existingLog.setExerciseName(log.getExerciseName());

                logsRepository.save(existingLog);
            } else {
                // 새로운 기록인 경우 저장
                logsRepository.save(log);
            }
        }
    }
    @Transactional
    public void deleteExerciseLogsByDate(String userId, LocalDate date) {
        logsRepository.deleteByUserIdAndExerciseDate(userId, date);
    }
    
    // 특정 exerciseId로 운동 기록 삭제
    public void deleteExerciseLogById(int exerciseId) {
        if (!logsRepository.existsById(exerciseId)) {
            throw new IllegalArgumentException("해당 운동 기록이 존재하지 않습니다.");
        }
        logsRepository.deleteById(exerciseId);
    }
}
