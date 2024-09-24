package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.AddressManagement;

public interface AddressManagementRepository extends JpaRepository<AddressManagement, Integer>{
	
}
