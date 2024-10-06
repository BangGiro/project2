package com.example.backProject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginUserDTO {

	private String userId;
	private String userName;
	private String role;
	private String token;
	
}
