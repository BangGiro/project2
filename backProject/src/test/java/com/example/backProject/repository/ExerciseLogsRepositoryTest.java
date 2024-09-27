package com.example.backProject.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.backProject.entity.ExerciseLogs;
import com.example.backProject.entity.Users;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ExerciseLogsRepositoryTest {
	
	@Autowired
	ExerciseLogsRepository exerciseLogsRepository;
		
	//===========insert,update========
	void insertTest() {
		ExerciseLogs exerciseLogs = ExerciseLogs.builder()
				.exerciseId(2)
				.userId("05")
				.exerciseDate(LocalDateTime.now())
				.exercise_type("벤치프레스")
				.weight_used(30)
				.reps(10)
				.sets(3)
				.build();
		exerciseLogsRepository.save(exerciseLogs);
	}
	//=========select==========
	void readTest() {
		int exerciseId =2;
		Optional<ExerciseLogs> exerciseLogs = exerciseLogsRepository.findById(exerciseId);
		if (exerciseLogs.isPresent()) 
			System.out.println(exerciseLogs.get()); 
			else System.out.println("notfound");
		
		log.info(exerciseLogs);
	}
	
	//==========delete============
	@Test
	void deleteTest() {
		int exerciseId =2;
		exerciseLogsRepository.deleteById(exerciseId);
	}

}
