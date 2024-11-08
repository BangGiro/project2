package com.example.backProject.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.domain.SchedulesDTO;
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
	
	//출결처리 ================================================================================
    @PostMapping(value = "/attd")
    public ResponseEntity<?> updateAttendance(@RequestBody Schedules scheduleRequest) {
        
        // scId로 스케줄을 조회합니다.
        Schedules sc = scService.findByScId(scheduleRequest.getScId());
        
        if (sc == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("스케줄을 찾을 수 없습니다.");
        }
        
        if(sc.getAttendance() == null) {
        	sc.setAttendance(scheduleRequest.getAttendance());
        	scRepository.save(sc);
        	gpService.decrementUse(scheduleRequest.getUserId());
        } else {
        	sc.setAttendance(scheduleRequest.getAttendance());
        	scRepository.save(sc);
        }
        
        
        return ResponseEntity.ok(null);
    }
    
    //수업일(count,이전 수업날, 다음 수업날) 받아오기 =======================================================================
	@GetMapping(value="/attdLogs/{userId}/{today}")
    public ResponseEntity<?> getAttendanceCount(@PathVariable String userId, 
            @PathVariable String today) {
		
	 SchedulesDTO dto= scService.attdPersonalLogs(userId, today);
		
		return ResponseEntity.ok(dto);
	}
    

	
}
