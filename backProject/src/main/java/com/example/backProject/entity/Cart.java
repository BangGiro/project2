package com.example.backProject.entity;

import java.time.LocalDateTime;

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
@Table(name = "cart")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cartId;
	
	@ManyToOne(fetch = FetchType.LAZY)  // ManyToOne 관계 설정
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;  // Users 엔티티 참조로 변경
	private LocalDateTime createdAt;
	
}
