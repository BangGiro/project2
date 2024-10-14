package com.example.backProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backProject.entity.GrantedPasses;

public interface GrantedPassesRepository extends JpaRepository<GrantedPasses, String> {

}
