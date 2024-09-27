package com.example.backProject.domain;

import java.time.LocalDateTime;

import com.example.backProject.entity.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SleepLogsDTO {
	
	//멤버 변수
	private int sleepId;
	private String userId;
	private LocalDateTime sleepDate;
	private LocalDateTime sleepStart;
	private LocalDateTime sleepEnd;
	private String sleepQuality;
	private int duration;
	private LocalDateTime createdAt;
	
}
