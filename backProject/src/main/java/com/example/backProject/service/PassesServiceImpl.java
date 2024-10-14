package com.example.backProject.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backProject.entity.Passes;
import com.example.backProject.repository.PassesRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class PassesServiceImpl implements PassesService{
	
	private final PassesRepository passRepository;
	
	@Override
	public List<Passes> findByUserId(String userId) {
		
		List<Passes> result = passRepository.findByUserId(userId);
		
		if(result != null) {
			log.info("pass불러오기 성공"+result);
			return result;
		} else {
			log.info("pass불러오기 실패");
			return null;
		}
	}//findByUserId
	
}
