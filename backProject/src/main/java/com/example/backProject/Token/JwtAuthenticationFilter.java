package com.example.backProject.Token;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backProject.repository.UsersRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	@Autowired
	private TokenProvider tokenProvider;
	@Autowired
	private UsersRepository usersRepository;
	
	private String parseBearerToken(HttpServletRequest request) {
		
		String bearerToken = request.getHeader("Authorization");
		if ( StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ") ) {
			return bearerToken.substring(7);
		}
		return null;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String token = parseBearerToken(request);
			log.info("JwtAuthenticationFilter doFilterInternal(), token 확인 => "+token);
			
			if(token != null && token.equalsIgnoreCase("null")){//토큰 존재여부 확인
				
				Map<String,Object> claims = tokenProvider.vaildateAndGetUserId(token);//비밀키 검증하고 claims반환
				log.info("tokenFilterCheck claims ➡️ "+claims);
				String userId = (String) claims.get("userId"); 
				log.info("tokenFilterCheck claims.userId ➡️ "+userId);
				
				
				AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userId, // 컨트롤러에서 @AuthenticationPrincipal 로 사용가능 (AuthController userDetail() 확인) 
						null ); //password=null;
				
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authentication);
				SecurityContextHolder.setContext(securityContext);
				
			}
			
		} catch (Exception e) {
			log.info("doFilterInternal Exception"+e.getMessage());
		}
		filterChain.doFilter(request, response);
	}//doFilterInternal
	
}	
