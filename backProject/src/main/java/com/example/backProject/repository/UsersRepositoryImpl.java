package com.example.backProject.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.backProject.entity.Users;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Repository
@RequiredArgsConstructor
public class UsersRepositoryImpl implements UsersRepository{
	private final EntityManager em;
	@Override
	public List<Users> findById() {
		return em.createQuery("select u from Users u ",Users.class)
		.getResultList();
	}
}
