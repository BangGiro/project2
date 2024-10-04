package com.example.backProject.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExerciseLogsDTO {
	
	//멤버 변수
	private int exerciseId;
	private String userId;
	private LocalDateTime exerciseDate;
	private String exerciseType;
	private double weightUsed;
	private String exerciseName;
	private String imagePath;
	private int reps;
	private int sets;
}
