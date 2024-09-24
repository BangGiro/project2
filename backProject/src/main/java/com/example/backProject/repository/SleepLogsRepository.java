package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.SleepLogs;

public interface SleepLogsRepository extends JpaRepository<SleepLogs, Integer>{
	
}
