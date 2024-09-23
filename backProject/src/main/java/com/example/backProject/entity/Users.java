package com.example.backProject.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {

	@Id
	private String userId;
	
	private String name;
	private String phoneNumber;
	private String email;
	
	@Column(updatable = false)
	private String password;
	
	private String address;
	private LocalDateTime joinDate;
	private String memberType;
	private String detailAddress;
	private String zipCode;
	private String trainerId;
	private String courseTicketId;
	
}
