package com.example.backProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.domain.UsersDTO;
import com.example.backProject.entity.Users;
import com.example.backProject.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@RestController
@RequestMapping(value = "/users")
@Log4j2
public class UserController {

	UserService uservice;

	
	//로그인======================================================================================
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users entity, HttpSession session ) {
		String password = entity.getPassword();
		//=>나중에 처리할 것
		
		log.info("entity 값 확인 =>" +entity.getUserId());
		
		//서비스 처리
		entity = uservice.findUsersById(entity.getUserId());
		
		//로그인 성공/실패 처리
    	if(entity != null && password.equals(entity.getPassword())) {
    
    		session.setAttribute("loginID", entity.getUserId());
    		session.setAttribute("loginName", entity.getName());
    		
    		final UsersDTO usersDTO = UsersDTO.builder()
//    				.token(token)
    				.userId(entity.getUserId())
    				.name(entity.getName())
    				.build();
    			
    		log.info("로그인 성공 =>" +HttpStatus.OK);
    		return ResponseEntity.ok(usersDTO);
    		
    	} else {
    		log.info("로그인 실패 =>" +HttpStatus.BAD_GATEWAY);
    		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("아이디나 비밀번호 오류");
    	}
	}
}
