package com.example.backProject.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.backProject.Token.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	
	@Bean //계층권한 메서드
	RoleHierarchy roleHierarchy() {

	    return RoleHierarchyImpl.fromHierarchy(
	    		"""
	    		ROLE_MANAGER > ROLE_TRAINER
	    		ROLE_TRAINER > ROLE_MEMBER
	    		"""
	    		);
	}
	
	
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		// 1) Filter 등록
		//http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class); 
		// => CorsFilter 사용하지 않으므로 변경함
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		// 2) HttpSecurity 빌더 설정 & return
		// => Boot3 부터는 빌더패턴 적용안되고 람다식만 적용됨
		return http.httpBasic(httpBasic -> httpBasic.disable()) // HTTP 기본 인증 비활성화
		        .formLogin(formLogin -> formLogin.disable()) // formLogin 비활성화
		        .logout(logout -> logout.disable()) // logout 비활성화
		        .csrf(csrf -> csrf.disable()) // CSRF 비활성화
		        .cors(cors -> {}) // CORS설정 활성화(기본값)_필수항목
		        .sessionManagement(session -> session
		            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 비활성화 (무상태)
		        /*
		        => authorizeHttpRequests()
		        	-> HTTP 요청에 대한 인가 설정을 구성하는 데 사용됨.
		        	-> 다양한 인가 규칙을 정의할수 있으며, 경로별로 다른 권한 설정이 가능.
		         */  
		        .authorizeHttpRequests(auth -> auth
		        		.requestMatchers("/Management").hasRole("TRAINER")
		        		.requestMatchers("/users/finduser").hasRole("TRAINER")
		        		.requestMatchers("/users/removemember").hasRole("TRAINER")
		        		.requestMatchers(HttpMethod.OPTIONS ,"/**").permitAll()
		        		.anyRequest().permitAll()) //추후 권한추가예정
		        .build();
	} //filterChain
	
	@Bean
	PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}//passwordEncoder
	
}
