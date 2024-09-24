package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.SleepLogsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class SleepLogsServiceImpl implements SleepLogsService {
	
	private final SleepLogsRepository sRepository;
	
	
	
}
