package com.example.backProject.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.backProject.entity.Review;
import com.example.backProject.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    // 절대 경로로 변경하여 파일 저장
    private static final String UPLOAD_DIR = "C:/Users/USER/Desktop/project3/myapp/public/image/review";

    public List<Review> getReviewsByProductId(int productId) {
        return reviewRepository.findByProductId(productId);
    }

    public Review addReview(Review review, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            String originalFileName = image.getOriginalFilename();
            String savePath = UPLOAD_DIR + "/" + originalFileName; // 원래 파일명으로 저장
            saveImage(image, savePath);

            // DB에 원래 파일명만 저장
            review.setImageUrl(originalFileName);
        }
        return reviewRepository.save(review);
    }

    public Review updateReview(int reviewId, Review review, MultipartFile image) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다."));

        existingReview.setComment(review.getComment());
        existingReview.setRating(review.getRating());

        if (image != null && !image.isEmpty()) {
            String originalFileName = image.getOriginalFilename();
            String savePath = UPLOAD_DIR + "/" + originalFileName; // 원래 파일명으로 저장
            saveImage(image, savePath);
            
            // DB에 원래 파일명만 저장
            existingReview.setImageUrl(originalFileName);
        }

        return reviewRepository.save(existingReview);
    }

    public void deleteReview(int reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    private void saveImage(MultipartFile image, String savePath) {
        try {
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs(); // 경로가 없다면 생성
            }
            image.transferTo(new File(savePath));
        } catch (IOException e) {
            throw new RuntimeException("이미지 저장에 실패했습니다.", e);
        }
    }
}
