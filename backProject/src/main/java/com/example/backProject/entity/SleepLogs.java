package com.example.backProject.entity;

import java.time.Duration;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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
	
	// Users 엔티티와의 관계 설정
    private String userId;
	private LocalDateTime sleepDate;
	private LocalDateTime sleepStart;
	private LocalDateTime sleepEnd;
	private String sleepQuality;
	private int duration;
	private LocalDateTime createdAt;
	// 엔티티가 처음 저장될 때 createdAt 설정
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.duration = calculateDuration(); // 수면 시간을 자동으로 계산
    }

    // 수면 시간을 계산하는 메서드
    private int calculateDuration() {
        if (sleepStart != null && sleepEnd != null) {
            return (int) Duration.between(sleepStart, sleepEnd).toMinutes(); // 분 단위로 계산
        }
        return 0;
    }
	
}
