package com.example.backProject.entity;

import jakarta.persistence.Entity;
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
@Table(name = "addressManagement")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressManagement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int shippingAddress;
	@ManyToOne  // ManyToOne 관계: 다수의 address_management가 한 명의 user에 연결됨
    @JoinColumn(name = "user_id", nullable = false)  // users 테이블의 user_id를 참조
	private Users user;
	
	
	private String address;
	private String detailAddress;
	private String zipCode;
	private String name;
	private String phoneNumber;
	private String addressType;
	
}
