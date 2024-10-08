package com.example.backProject.entity;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)  
    private LocalDateTime exerciseDate;
    private String exerciseType;
    private double weightUsed;
    private int reps;
    private int sets;

    @ManyToOne
    @JoinColumn(name = "image_id", referencedColumnName = "image_id")
    private ExerciseImages exerciseImage;

    private String exerciseName;
    private String imagePath;
}

