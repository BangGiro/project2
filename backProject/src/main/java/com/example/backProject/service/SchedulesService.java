package com.example.backProject.service;

import java.util.Date;
import java.util.List;

import com.example.backProject.entity.Schedules;

public interface SchedulesService {

	public List<Schedules> findByYYYYmmTrainerId(int year, int month, String trainerId);
	
	public Schedules findByScId(int scId);
}
