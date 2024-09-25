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
@Table(name = "sleepLogs")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SleepLogs {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sleepId;
	
	private String userId;
	private LocalDateTime sleepDate;
	private LocalDateTime sleepStart;
	private LocalDateTime sleepEnd;
	private String sleepQuality;
	private int duration;
	private LocalDateTime createdAt;
	private int sets;
	
}
