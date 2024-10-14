package com.example.backProject.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.backProject.domain.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
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
	@Column(length = 20)
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
	private String gender;
	
	public void updateTrainerId(String trainerId) {
		this.trainerId = trainerId;
	}
	
	
	@ElementCollection(fetch = FetchType.LAZY)
	@Enumerated(EnumType.STRING)
	@JoinTable(name = "users_roles", 
	           joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "role")
	@Builder.Default
	private List<Roles> roleList = new ArrayList<>(); //어떻게 enum을 타입을 받은거지??
	

	public void addRole(Roles memberRole) {
		roleList.add(memberRole);
	}
	
	public void clearRole() {
		roleList.clear();
	}
	
	//얘네들은 왜 public이지?
	public Map<String , Object> claimList() {
		Map<String, Object>dataMap = new HashMap<>();
		dataMap.put("userId",this.userId);
		dataMap.put("roleList", this.roleList);
		
		return dataMap;
	}
}
