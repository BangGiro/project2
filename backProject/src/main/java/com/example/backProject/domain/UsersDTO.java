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
public class UsersDTO {
	
	//멤버 변수
	private String userId;
	private String name;
	private String phoneNumber;
	private String email;
	private String password;
	private String address;
	private LocalDateTime joinDate;
	private String memberType;
	private String detailAddress;
	private String zipCode;
	private String trainerId;
	private String courseTicketId;
}
