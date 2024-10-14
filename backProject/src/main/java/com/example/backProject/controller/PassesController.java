package com.example.backProject.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.domain.PassesDTO;
import com.example.backProject.entity.GrantedPasses;
import com.example.backProject.entity.Passes;
import com.example.backProject.repository.GrantedPassesRepository;
import com.example.backProject.repository.PassesRepository;
import com.example.backProject.service.PassesService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@RestController
@RequestMapping(value = "/pass")
@Log4j2
public class PassesController {
	
	PassesRepository passRepository;
	GrantedPassesRepository grPassRepository;
	
	PassesService passService;
	
	//추가============================================================
	@PostMapping(value="/add")
	public ResponseEntity<?> addPass(@RequestBody Passes pass) { 
		
		passRepository.save(pass);
		
		return ResponseEntity.ok(null);
		
	}
	
	//불러오기==========================================================
	@GetMapping(value="/find/{userId}")
	public ResponseEntity<?> findall(PassesDTO passdto){
		
		List<Passes> list =  passService.findByUserId(passdto.getUserId());
		
		return ResponseEntity.ok(list);
	}
	
	//부여하기 =========================================================
	@PostMapping(value="/grant")
	public ResponseEntity<?> grantPass(@RequestBody GrantedPasses grant){
		
		grPassRepository.save(grant);
		
		return ResponseEntity.ok(true);
	}
	
	
}
