package com.example.backProject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CategoriesDTO {
	
	//멤버 변수
	private int categoryId;
	private String categoryName;
	
}
