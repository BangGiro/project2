package com.example.backProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.ExerciseImages;

public interface ExerciseImagesRepository extends JpaRepository<ExerciseImages, Integer> {
    List<ExerciseImages> findAllByCategory(String category);
}
