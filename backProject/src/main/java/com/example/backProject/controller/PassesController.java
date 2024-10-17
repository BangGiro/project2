package com.example.backProject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.entity.GrantedPasses;
import com.example.backProject.entity.Passes;
import com.example.backProject.repository.GrantedPassesRepository;
import com.example.backProject.repository.PassesRepository;
import com.example.backProject.service.GrantedPassesService;
import com.example.backProject.service.PassesService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@RestController
@RequestMapping(value = "/pass")
@Log4j2
public class PassesController {
	
	PassesRepository passRepository;
	GrantedPassesRepository gPassRepository;
	
	PassesService passService;
	GrantedPassesService gPassService;
	
	//추가============================================================
	@PostMapping(value="/add")
	public ResponseEntity<?> addPass(@RequestBody Passes pass) { 
		
		passRepository.save(pass);
		
		return ResponseEntity.ok(null);
		
	}
	
	//수강권 불러오기==========================================================
	@GetMapping(value="/find/{userId}/{type}")
	public ResponseEntity<?> findall(@PathVariable String type, @PathVariable String userId){
		 List<Passes> list = null;
		 GrantedPasses gpass =  null;
		 
		 
		if("passes".equals(type)) {
			list =  passService.findByUserId(userId);
			return ResponseEntity.ok(list);
		} else if("gpass".equals(type)){
			gpass = gPassService.findUsersById(userId);
			return ResponseEntity.ok(gpass);
		} 
		
		return ResponseEntity.ok(null);
	}
	
	//부여하기 =========================================================
	@PostMapping(value="/grant")
	public ResponseEntity<?> grantPass(@RequestBody GrantedPasses grant){
		
		gPassRepository.save(grant);
		
		return ResponseEntity.ok(true);
	}
	
	
}
