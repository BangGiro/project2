package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backProject.entity.Users;
import com.example.backProject.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

	private final UsersRepository uRepository;
	
	@Override
	public Users findUsersById(String userId) {
		Optional<Users> result = uRepository.findById(userId);
		
		if(result.isPresent()) {
			log.info("조회성공"+result.get());
			return result.get();
		} else {
			log.info("service 조회실패");
			return null;
		}
//		return uRepository.findById(Id).orElse(null);
	} 
	
	@Override
	public List<Users> findByTrainerId(String trainerId) {
		
		List<Users> list = uRepository.findByTrainerId(trainerId);
		
		if(list != null) {
			return list;
		} else {
			return null;
		}
	}//findByTrainerId
	
	
	@Override
	public Users updateTrainerId(String userId) {
		
		
		
		return null;
	}
}
