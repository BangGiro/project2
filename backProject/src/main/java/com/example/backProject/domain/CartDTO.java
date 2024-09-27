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
public class CartDTO {
	
	//멤버 변수
	private int cartId;
	private String userId;
	private LocalDateTime createdAt;
	
}
