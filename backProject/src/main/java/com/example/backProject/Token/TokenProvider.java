package com.example.backProject.Token;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Service
public class TokenProvider {
	private static final String SECRET_KEY ="qkdrlfh188tpscl";
	
	//추후 수정예정 ~ 회원타입 에 반응해서 권한 줄 예정
	public String createToken(Map<String , Object> claimList) {
		
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
		
		return Jwts.builder()
				.signWith(SignatureAlgorithm.HS512, SECRET_KEY)  
				// => payload에 들어갈 내용
				.setClaims(claimList) 
				// -> 메서드 인자로 전달 받으며, Map에 id 와 roleList 를 가지고 있음 (Member.java 참고)
				.setIssuer("demo app") 	    
				.setIssuedAt(new Date())    
				.setExpiration(expiryDate)  
				.compact();
	} // createToken

	
	public Map<String, Object> vaildateAndGetUserId(String token) {
		Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(token)
							.getBody();
		
		return claims; //useId와 그 외 담겨있음 (key value)상태
	}//valodateAndGetUserId
	
}//class
