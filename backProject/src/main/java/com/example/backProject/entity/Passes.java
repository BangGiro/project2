package com.example.backProject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Passes")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Passes {
	
	@Id
	private int PassId;
	
	private String passName;
	private int defaultUses;
	private int expiry;
	private String userId;
	
}
