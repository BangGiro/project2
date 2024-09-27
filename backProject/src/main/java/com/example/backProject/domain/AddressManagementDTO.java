package com.example.backProject.domain;

import com.example.backProject.entity.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddressManagementDTO {
	
	//멤버 변수
	private int shippingAddress;
	private String userId;
	private String address;
	private String detailAddress;
	private String zipCode;
	private String name;
	private String phoneNumber;
	private String addressType;
	
}
