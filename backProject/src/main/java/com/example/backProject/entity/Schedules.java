package com.example.backProject.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "schedules")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Schedules {
	
	@Id
	private int scId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	private String passName;
	private String scheduleMemo;
	private String userId;
	private String startTime;
	private String endTime;
	private String trainerId;
	private	boolean attendance;
	
	@Transient
	private String userName; // userName 필드 추가 (조인용)
	@Transient
	private String trainerName; // trainerName 추가 (조인용)
	
}
