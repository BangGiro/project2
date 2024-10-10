package com.example.backProject.service;

import java.util.List;

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
	
	
}
