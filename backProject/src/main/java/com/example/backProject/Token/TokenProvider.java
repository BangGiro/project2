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
	public String createToken(String id) {
		
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
		
		return Jwts.builder()
					.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
					.setClaims(null)
					.setSubject(id)
					.setIssuer("allinone")
					.setIssuedAt(new Date())
					.setExpiration(expiryDate)
					.compact();
	} // createToken

	
	public Map<String, Object> vaildateAndGetUserId(String token) {
		Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(token)
							.getBody();
		
		return claims;
	}//valodateAndGetUserId
	
}//class
