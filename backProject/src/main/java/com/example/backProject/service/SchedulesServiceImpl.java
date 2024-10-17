package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backProject.entity.Schedules;
import com.example.backProject.mapper.SchedulesMapper;
import com.example.backProject.repository.SchedulesRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class SchedulesServiceImpl implements SchedulesService {

	private final SchedulesRepository scRepository;
	private final SchedulesMapper scMapper;
	
	
	@Override
	public List<Schedules> findByYYYYmmTrainerId(int year, int month, String trainerId) {
		
		List<Schedules> list = scMapper.findByYYYYmmAndTrainerId(year, month, trainerId);
		
		if(list != null) {
			return list;
		} else {
			log.info("스케쥴 데이터없음");
			return null;
		}
	}
	
	
	@Override
	public Schedules findByScId(int scId) {

	    Optional<Schedules> optionalSc = scRepository.findById(scId);
	    
	    if (optionalSc.isPresent()) {
	        Schedules sc = optionalSc.get();
	        
	        return sc;
	    } else {
	        return null;
	    }

	}
	
}
