package com.example.backProject.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.entity.GrantedPasses;
import com.example.backProject.entity.Schedules;
import com.example.backProject.repository.GrantedPassesRepository;
import com.example.backProject.repository.SchedulesRepository;
import com.example.backProject.service.GrantedPassesService;
import com.example.backProject.service.SchedulesService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@RestController
@RequestMapping(value = "/sc")
@Log4j2
public class SchedulesController {
	
	SchedulesRepository scRepository;
	SchedulesService scService;
	GrantedPassesService gpService;
	GrantedPassesRepository gpRepository;
	
	//추가============================================================
	@PostMapping(value="/save")
	public ResponseEntity<?> saveSc(@RequestBody Schedules sc) { 
		
		scRepository.save(sc);
		log.info("scController save data: "+sc);
		return ResponseEntity.ok(null);
		
	}
	
	//월별 스케쥴 불러오기 ==============================================
	@GetMapping(value="/road/{year}/{month}/{trainerId}")
	public ResponseEntity<?> roadSc(@PathVariable int year, @PathVariable int month,
										@PathVariable String trainerId) {
		
		List<Schedules> list = scService.findByYYYYmmTrainerId(year, month, trainerId);
	

		return ResponseEntity.ok(list);
	}
	
	//스케쥴 삭제 =========================================================
	@DeleteMapping(value="/delete/{scId}")
	public ResponseEntity<?> delSc(@PathVariable int scId) {
		
		scRepository.deleteById(scId);
		
		return ResponseEntity.ok(null);
	}
	
	//출결처리 ==================================================================
	@PostMapping(value = "/attd")
	public ResponseEntity<?> updateAttendance(@RequestBody int scId, @RequestBody boolean attendance,
			@RequestBody String userId) {
		
		Schedules sc = scService.findByScId(scId);
		sc.setAttendance(attendance);
		scRepository.save(sc);
		
		gpService.decrementUse(userId);
		
		return ResponseEntity.ok(null);
	}
	
	
}
