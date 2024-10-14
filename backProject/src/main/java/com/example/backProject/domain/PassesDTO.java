package com.example.backProject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PassesDTO {
	private int PassId;
	private String passName;
	private int defaultUses;
	private int expiry;
	private String userId;
}
