package com.example.backProject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//** WebMvcConfigurer
//=> 스프링의 자동설정에 원하는 설정을 추가 설정할수있는 메서드들을 제공하는 인터페이스. 
//=> 스프링부트 컨트롤러 매핑메서드에서는 "/" 무시됨 -> addViewControllers 메서드로 해결(boot3에선 자동지원함)
// CORS 방침 설정 지원 -> addCorsMApping()

@Configuration
public class WebMVCconfig implements WebMvcConfigurer{
	
	//=> CORS 방침 설정 -> addCorsMappings()
    //** React Project CORS 방침 설정
    // ** CORS 방침 설정
    // => CORS(Cross-Origin Resource Sharing) : 교차(다른) 출처 리소스 공유 
    // => Origin: Protocol, Host, 포트번호를 합친것으로 서버를 찾아가기위한 가장기본적인 주소
    // => 요청헤더에는 이요청의 Origin이 담겨있고 서버는 이를 확인해 자신의 Origin과 다르면 이요청을 거절함 (403) 
    //    그러므로 서버에서 이를 허용하는 방침을 설정해야함.
    // => (CORS 개념 & 해결법 - 정리 All, Good)  
    //      https://inpa.tistory.com/entry/WEB-📚-CORS-💯-정리-해결-방법-👏 
    
    // ** [Spring Boot] CORS 해결 방법 3가지  (https://wonit.tistory.com/572 )
    // => Filter, @CrossOrigin, WebMvcConfigurer
    
    // => 방법1 설정 
    //    아래 addCorsMappings(...) 메서드를 이용해서 CORS를 적용할 URL패턴을 정의할 수 있음 
    // => https://dev.exd0tpy.xyz/49 
	
	private final long MAX_AGE_SECS = 3600;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// 모든 경로에 대해 적용
		registry.addMapping("/**")
				.allowedOrigins("Http://localhost:3000")
				.allowedMethods("GET","POST","PUT","FATCH","DELETE","OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(MAX_AGE_SECS);
	}
	
	
	
}
