package com.example.backProject.entity;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Column(length = 20)
    private String userId;
    private LocalDate sleepDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime sleepStart;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime sleepEnd;

    private String sleepQuality;
    private double duration; // 시간 단위로 저장

    private LocalDateTime createdAt;

    // 엔티티가 처음 저장될 때 createdAt 및 duration 설정
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.duration = calculateDuration(); // 수면 시간을 시간 단위로 계산
    }

    // 수면 시간을 시간 단위로 계산하는 메서드
    private double calculateDuration() {
        if (sleepStart != null && sleepEnd != null) {
            return Duration.between(sleepStart, sleepEnd).toMinutes() / 60.0; // 시간 단위로 계산
        }
        return 0;
    }
}
