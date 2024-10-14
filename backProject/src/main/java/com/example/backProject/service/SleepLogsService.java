package com.example.backProject.service;

import java.util.List;
import java.util.Optional;

import com.example.backProject.entity.SleepLogs;

public interface SleepLogsService {
	public void saveSleepLog(SleepLogs sleepLogs);
	 public List<SleepLogs> getSleepLogsByUserId(String userId);
	 public boolean deleteSleepLogsBySleepId(int sleepId);
}
