package com.example.backProject.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
@Data
	@Builder
	@AllArgsConstructor
	public class PageRequestDTO {
		private int page; //출력할 PageNo
		private int size; //rows/Page
		private String type;
		private String keyword;
		
		public PageRequestDTO() {
			this.page=1;
			this.size=5;
		}
		public Pageable getPageable(Sort sort) {
			return PageRequest.of(page-1, size, sort);
			 // => of: 페이징을 위한 데이터의 조건을 적어주는 메서드
	        // => JPA 에서는 pageNo 가 0 부터 시작하기 때문에 page-1
	        //       단, application.properties에서 변경가능  
	        //      # pageable : 1페이지부터 시작하도록 변경
	        //      spring.data.web.pageable.one-indexed-parameters=true
	        
	        // => sort: 필요시 사용을 위함.
			
		}
	}
