package com.example.backProject.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exercise_logs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseLogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int exerciseId;

    private String userId;
    @Column(nullable = false)
    private LocalDate exerciseDate;
    private String exerciseType;
    private double weightUsed;
    private int reps;
    private int sets;

    private int ImageId;

    private String exerciseName;
    private String imagePath;
}

