package com.example.backProject.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
	@ManyToOne(fetch = FetchType.LAZY)  // 성능 최적화를 위해 지연 로딩 사용
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
	
	@Column(name = "exercise_date", nullable = false)
    private LocalDateTime exerciseDate;
	
	private String exercise_type;
	private double weight_used;
	private int reps;
	private int sets;
	
}
