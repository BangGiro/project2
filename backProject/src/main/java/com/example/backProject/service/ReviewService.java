package com.example.backProject.service;

import java.util.List;

import com.example.backProject.entity.Review;

public interface ReviewService {
	

	public List<Review> getReviewsByProductId(int productId);
	public Review addReview(Review review);
	public void deleteReview(int reviewId);
	public Review updateReview(int reviewId, String comment, int rating);
}
