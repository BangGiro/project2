package com.example.backProject.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.backProject.entity.Users;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class UsersRepositoryTest {
	
//	@Autowired
	UsersRepository uRepository;
		
	//===========insert,update========
	void insertTest() {
		Users users = Users.builder()
				.userId("test02")
				.name("방기로")
				.phoneNumber("0100000000")
				.email("벤치프레스")
				.password("asdasd")
				.joinDate(LocalDateTime.now())
				.memberType("sdsd")
				.build();
		uRepository.save(users);
	}
	//=========select==========
//	@Test
	void readTest() {
		Optional<Users> result = uRepository.findById("test02");
		if (result.isPresent()) 
			System.out.println(result.get()); 
			else System.out.println("notfound");
		
		log.info(result.get());
	}
//	
	//==========delete============
//	void deleteTest() {
//		int exerciseId =2;
//		exerciseLogsRepository.deleteById(exerciseId);
//	}

}
