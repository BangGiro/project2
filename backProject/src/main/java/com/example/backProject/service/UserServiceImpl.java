package com.example.backProject.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backProject.entity.Users;
import com.example.backProject.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UsersRepository uRepository;
	
	@Override
	public List<Users> selectName() {
		return uRepository.findById();
	}
	
	@Override
	public Users selectOne(String id) {
		return uRepository.selectOne(id);
	}
	
}
