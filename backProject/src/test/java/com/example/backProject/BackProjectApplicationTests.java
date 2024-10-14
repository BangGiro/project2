package com.example.backProject;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.backProject.entity.Reply;
import com.example.backProject.entity.Review;
import com.example.backProject.repository.ReplyRepository;

@SpringBootTest
class BackProjectApplicationTests {
	
	@Autowired
	private ReplyRepository replyRepository;
	
	@Test
	void ReplyTest() {
		Reply r1 = Reply.builder()
				.userId("테스트테스트")
				.replyId(1)
				.reply("답글테스트 중")
				.createdAt(LocalDateTime.now())
				.updatedAt(LocalDateTime.now())
				.review(Review.builder().reviewId(30).build())
				.build();
		replyRepository.save(r1);
				
	}

}

