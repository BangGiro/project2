package com.example.backProject.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.backProject.entity.Review;

public interface ReviewService {
	

	public List<Review> getReviewsByProductId(int productId);
	public Review addReview(Review review, MultipartFile image);
	public void deleteReview(int reviewId);
	public Review updateReview(int reviewId, Review review, MultipartFile image);
}
