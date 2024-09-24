package com.example.backProject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "addressManagement")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressManagement {

	@Id
	private int shippingAddress;
	
	private String userId;
	private String address;
	private String detailAddress;
	private String zipCode;
	private String name;
	private String phoneNumber;
	private String addressType;
	
}
