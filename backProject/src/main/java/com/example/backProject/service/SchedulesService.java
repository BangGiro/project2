package com.example.backProject.service;

import java.time.LocalDate;
import java.util.List;

import com.example.backProject.domain.SchedulesDTO;
import com.example.backProject.entity.Schedules;

public interface SchedulesService {

	public List<Schedules> findByYYYYmmTrainerId(int year, int month, String trainerId);
	
	public Schedules findByScId(int scId);
	
	public SchedulesDTO attdPersonalLogs(String userId , String today);
}
