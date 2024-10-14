package com.example.backProject.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.entity.SleepLogs;
import com.example.backProject.repository.SleepLogsRepository;
import com.example.backProject.service.SleepLogsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sleep")
@RequiredArgsConstructor
public class SleepLogsController{
		
	 private final SleepLogsService sleepLogsService;
	 @Autowired
	 private SleepLogsRepository sleepLogRepository;

	 
	// 수면 기록 저장 API
	 @PostMapping("/logs")
	    public ResponseEntity<?> saveOrUpdateSleepLog(@RequestBody SleepLogs newLog) {
	        // 같은 날짜에 같은 유저의 기록이 있는지 확인
	        Optional<SleepLogs> existingLogOpt = sleepLogRepository.findByUserIdAndSleepDate(newLog.getUserId(), newLog.getSleepDate());

	        if (existingLogOpt.isPresent()) {
	            // 기존 기록 업데이트
	            SleepLogs existingLog = existingLogOpt.get();
	            existingLog.setSleepStart(newLog.getSleepStart());
	            existingLog.setSleepEnd(newLog.getSleepEnd());
	            existingLog.setSleepQuality(newLog.getSleepQuality());

	            // 수면 시간을 다시 계산
	            existingLog.setDuration(newLog.getDuration());

	            // 업데이트된 기록 저장
	            sleepLogRepository.save(existingLog);
	            return ResponseEntity.ok("수면 기록이 업데이트되었습니다.");
	        } else {
	            // 새로운 기록 삽입
	            sleepLogRepository.save(newLog);
	            return ResponseEntity.ok("새로운 수면 기록이 저장되었습니다.");
	        }
	    }
	    //조회
	    @GetMapping("/user/{userId}")
	    public ResponseEntity<List<SleepLogs>> getSleepLogsByUserId(@PathVariable String userId) {
	        List<SleepLogs> sleepLogs = sleepLogsService.getSleepLogsByUserId(userId);
	        if (sleepLogs.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.ok(sleepLogs);
	    }
	    
	    @DeleteMapping("/logs/{sleepId}")
	    public ResponseEntity<?> deleteSleepLogsBySleepId(@PathVariable int sleepId){
	    	boolean isDeleted = sleepLogsService.deleteSleepLogsBySleepId(sleepId);
	    	if (isDeleted) {
	            return ResponseEntity.ok("수면 기록이 성공적으로 삭제되었습니다.");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 기록을 찾을 수 없습니다.");
	        }
	    
	    }
	    
	    
	    
	    
}//controller
