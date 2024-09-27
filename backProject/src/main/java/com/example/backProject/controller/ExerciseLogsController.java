package com.example.backProject.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.entity.ExerciseLogs;
import com.example.backProject.service.ExerciseLogsService;

@RestController
@RequestMapping("/exercises")
public class ExerciseLogsController{
	@Autowired
    private ExerciseLogsService exerciseService;
	 @GetMapping("/logs")
	    public List<ExerciseLogs> getExerciseLogs(@RequestParam String userId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime date) {
	        return exerciseService.getExerciseLogsByDate(userId, date);
	    }

	    @PostMapping("/log")
	    public void saveExerciseLog(@RequestBody ExerciseLogs exerciseLog) {
	        exerciseService.saveExerciseLog(exerciseLog);
	    }
}
