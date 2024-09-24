package com.example.backProject.service;

import org.springframework.stereotype.Service;

import com.example.backProject.repository.ExerciseLogsRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ExerciseLogsServiceImpl implements ExerciseLogsService {
	
	private final ExerciseLogsRepository eRepository;
	
	
	
}
