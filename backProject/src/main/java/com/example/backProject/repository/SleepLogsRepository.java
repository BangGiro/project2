package com.example.backProject.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backProject.entity.SleepLogs;

public interface SleepLogsRepository extends JpaRepository<SleepLogs, Integer>{
	List<SleepLogs> findByUserId(String userId);
	@Query("SELECT s FROM SleepLogs s WHERE s.userId = :userId AND s.sleepDate = :sleepDate")
    Optional<SleepLogs> findByUserIdAndSleepDate(String userId, LocalDate sleepDate);
}
