package com.example.backProject.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backProject.Token.TokenProvider;
import com.example.backProject.domain.LoginUserDTO;
import com.example.backProject.domain.Roles;
import com.example.backProject.domain.UsersDTO;
import com.example.backProject.entity.Users;
import com.example.backProject.repository.UsersRepository;
import com.example.backProject.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@RestController
@RequestMapping(value = "/users")
@Log4j2
public class UserController {

	UserService userService;
	UsersRepository userRepository;
	PasswordEncoder passwordEncoder;
	TokenProvider tokenProvider;
	
	
	//로그인======================================================================================
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users entity, HttpSession session ) {
		String password = entity.getPassword();
		//=>나중에 처리할 것
		
		log.info("entity 값 확인 =>" +entity.getUserId());
		
		//서비스 처리
		entity = userService.findUsersById(entity.getUserId());
		
		//토큰발행
		
		//로그인 성공/실패 처리
    	if(entity != null && passwordEncoder.matches(password, entity.getPassword())) {

    		session.setAttribute("loginID", entity.getUserId());
    		session.setAttribute("loginName", entity.getName());
    
    		final String token = tokenProvider.createToken(entity.claimList());
    	
    		final LoginUserDTO usersDTO = LoginUserDTO.builder()
    				.token(token)
    				.userId(entity.getUserId())
    				.userName(entity.getName())
    				.build();
    			
    		log.info("로그인 성공 =>" +HttpStatus.OK);
    		log.info("반환값 확인=>"+usersDTO);

    		return ResponseEntity.ok(usersDTO);

    		
    	} else {
    		log.info("로그인 실패 =>" +HttpStatus.BAD_GATEWAY);
    		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("아이디나 비밀번호 오류");
    	}
	}
	
	//로그아웃======================================================================================
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody Users entity, HttpSession session ) {
		session.invalidate();
		
		return ResponseEntity.ok(null);
	}	
	
	//회원가입=======================================================================================
	//임시 코드임 추후 보강필요
	@PostMapping("/signUp")
	public ResponseEntity<?> signUp(@RequestBody Users entity, HttpSession session ) {
		
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		
		switch(entity.getMemberType()) {
		 case "트레이너": entity.addRole(Roles.TRAINER);
		 				break;
		 default: entity.addRole(Roles.MEMBER);
		 				break;
		}
		
		userRepository.save(entity);
		
		return ResponseEntity.ok(null);
	}
	
	//회원추가=======================================================================================
	//GPT코드임(임시) 추후 보강필요
	@PostMapping("/finduser")
	public ResponseEntity<?> findUser(@RequestBody Users entity, HttpSession session){
		
		Users user = userService.findUsersById(entity.getUserId());
		
		log.info("findUser ➡️ "+user);
		
//        List<UsersDTO> usersDTOList = userslist.stream().map(user -> {
//            UsersDTO dto = new UsersDTO();
//            dto.setName(user.getName());
//            dto.setPhoneNumber(user.getPhoneNumber());
//            return dto;
//        }).collect(Collectors.toList());
		
		return ResponseEntity.ok(user);
	}
	
	//내회원으로등록====================================================================================
	@PutMapping("/addmember")
	public ResponseEntity<?> addUser(@RequestBody Map<String, String> request, HttpSession session){
		
		Users finduser = userService.findUsersById(request.get("userId"));
		log.info("adduser ➡️ "+finduser);
		
		finduser.updateTrainerId(request.get("trainerId"));
		
		userRepository.save(finduser);
		log.info("adduser trainerId➡️ "+finduser.getTrainerId());
		
		return ResponseEntity.ok(null);
	}
	
	//트레이너 아이디 삭제(내 회원에서 지우기. 탈퇴 아님)=========================================================
	@PatchMapping("/removemember/{userId}")
	public ResponseEntity<?> patchMember(UsersDTO user){
		
		Users finduser = userService.findUsersById(user.getUserId());
		finduser.updateTrainerId(null);
		
		userRepository.save(finduser);
		return ResponseEntity.ok(null);
	}
	
	
	//유저리스트 불러오기=================================================================================
	@PostMapping("/finduserlist")
	public ResponseEntity<?> findUserList(@RequestBody Users entity, HttpSession session){
		
		List<Users> list = userService.findByTrainerId(entity.getTrainerId());
		
		return ResponseEntity.ok(list);
	}
	
	//유저개인정보 불러오기================================================================================
	@GetMapping("/{userId}")
	public ResponseEntity<?> findUserDetail(Users entity){
		
		Users user = userService.findUsersById(entity.getUserId());
		
		return ResponseEntity.ok(user);
	}
	

	
	
}
