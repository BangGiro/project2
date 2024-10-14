package com.example.backProject.entity;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "GrantedPasses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GrantedPasses {
	
	@Id
	private String userId;
	
	private String passName;
	private int remainingUse;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date startDate;
	
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date endDate;
	
    private Integer useCount; //null이 들어와도 된다
	
}
