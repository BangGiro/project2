package com.example.backProject.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backProject.entity.GrantedPasses;
import com.example.backProject.repository.GrantedPassesRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class GrantedPassesServiceImpl implements GrantedPassesService{
	
	private final GrantedPassesRepository repository;
	
	@Override
	public GrantedPasses findUsersById(String userId) {
		
		Optional<GrantedPasses> result = repository.findById(userId);
		
		if(result.isPresent()) {
			log.info("조회성공");
			return result.get();
		} else {
			log.info("조회실패" + userId);
			return null;
		}
	} //findById
	
}