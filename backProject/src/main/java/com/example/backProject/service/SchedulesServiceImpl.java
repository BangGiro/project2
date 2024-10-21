package com.example.backProject.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backProject.domain.SchedulesDTO;
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
	
	@Override
	public SchedulesDTO attdPersonalLogs(String userId, String today) {
		
		SchedulesDTO dto = SchedulesDTO.builder()
			.attendanceCount(scMapper.CountScByUserId(userId))
			.pvdate(scMapper.getPreviousSchedule(today, userId))
			.nxdate(scMapper.getNextSchedule(today, userId))
			.build();
		
		return dto;
	}
	
}
