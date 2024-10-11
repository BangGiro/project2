package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backProject.entity.SleepLogs;
import com.example.backProject.repository.SleepLogsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class SleepLogsServiceImpl implements SleepLogsService {
	
	private final SleepLogsRepository sleepLogsRepository;
	
	 public void saveSleepLog(SleepLogs sleepLogs) {
	        sleepLogsRepository.save(sleepLogs);
	    }
	 
	 public List<SleepLogs> getSleepLogsByUserId(String userId) {
		    return sleepLogsRepository.findByUserId(userId);
		}
	 
	 public boolean deleteSleepLogsBySleepId(int sleepId) {
	        Optional<SleepLogs> sleepLog = sleepLogsRepository.findById(sleepId);
	        if (sleepLog.isPresent()) {
	            sleepLogsRepository.deleteById(sleepId);
	            return true; // 삭제 성공
	        }
	        return false; // 기록을 찾지 못한 경우
	    }
	
	 
	 
}
