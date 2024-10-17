package com.example.backProject.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backProject.entity.Schedules;

public interface SchedulesRepository extends JpaRepository<Schedules, Integer>{
	
	@Query("Select sc from Schedules sc Where sc.date = :date And sc.userId = :userId")
	List<Schedules> findByUserIdAndDate(Date date, String userId);
	
}
