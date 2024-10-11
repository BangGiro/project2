package com.example.backProject.repository;

import com.example.backProject.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> { 
    List<Review> findByProductId(int productId); 
}
