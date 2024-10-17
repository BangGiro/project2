package com.example.backProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backProject.entity.Review;
import com.example.backProject.service.ReviewService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable int productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(
            @RequestPart("review") Review review,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        Review newReview = reviewService.addReview(review, image);
        return ResponseEntity.ok(newReview);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @PathVariable int reviewId,
            @RequestPart("review") Review review,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        Review updatedReview = reviewService.updateReview(reviewId, review, image);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }
}
