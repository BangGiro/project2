package com.example.backProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@RestController
@RequestMapping(value = "/users")
@Log4j2
public class UserController {
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	//커밋 테스트
	UserService uservice;
	
	@GetMapping("/selectAll")
	public void uList() {
		System.out.println(uservice.selectName());
	} //mList
}
