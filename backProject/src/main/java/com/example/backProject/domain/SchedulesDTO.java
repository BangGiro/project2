package com.example.backProject.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SchedulesDTO {
	

	private int scId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	private String passName;
	private String scheduleMemo;
	private String userId;
	private String startTime;
	private String endTime;
	private String trainerId;
	private	Character attendance;
	
	
	private String userName; // userName 필드 추가 (조인용)
	private String trainerName; // trainerName 추가 (조인용)
	
	private Integer attendanceCount;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate pvdate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate nxdate;
	
	private String today;
}
