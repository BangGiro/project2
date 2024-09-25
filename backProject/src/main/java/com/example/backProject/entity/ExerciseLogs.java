package com.example.backProject.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exerciseLogs")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseLogs {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int exerciseId;
	
	private String userId;
	private LocalDateTime exerciseDate;
	private String exercise_type;
	private double weight_used;
	private int reps;
	private int sets;
	
}
