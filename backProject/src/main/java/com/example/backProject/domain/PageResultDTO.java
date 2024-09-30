package com.example.backProject.domain;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.Data;

@Data
public class PageResultDTO <DTO,EN>{
	//DTO List
	private List<DTO> dtoList;
	
	//총 PageNo
	private int totalPage;
	
	private int page; //출력할 PageNo
	private int size; //출력할 rowsPerPage
	
	private int start,end;
	private boolean prev,next;
	private List<Integer> pageList; //PageNo 목록
	
	// ** 생성자 정의
	//=> 제네릭은 컴파일 타임에 타입을 전달해서 결정하는 것으로
	//   생성자메서드 정의시에는 정의하지 않음 (정의하면 오히려 컴파일 오류발생)
	//=> Page<EN> type 을 이용해 최종 List<DTO> 생성 
	//=> Function<EN, DTO> : Entity 객체들을 DTO로 변환   
	public PageResultDTO(Page<EN> result,Function<EN, DTO> fn) {
		
		dtoList=result.stream().map(fn).collect(Collectors.toList());
		//=> stream()
        //    - 배열, 컬렉션등을 대상으로하여 스트림을 생성해줌
        //    - 스트림은 forEach(), filter(), sum(), map() 등 다양한 연산을 할수있는 메서드 제공   
        //=> map(fn)
        //    - 스트림 요소 중에서 원하는 필드만 뽑아내거나, 특정 형태로 변환해야 할 때 사용
        //    - Entity 객체들을 DTO로 변환
        //=> collect()
        //    - 스트림의 요소들을 수집하는 최종연산
        //    - Collectors 클래스의 toList(): 스트림의 모든 요소를 List 로 수집 
		
		//2.출력에 필요한 값 계산
		totalPage= result.getTotalPages();
		makePageList(result.getPageable());
	}
	
	
	private void makePageList(Pageable pageable){

        this.page = pageable.getPageNumber() + 1; // 0부터 시작하므로 1을 추가
        this.size = pageable.getPageSize();

        int tempEnd = (int)(Math.ceil(page/(double)size)) * size;
        start = tempEnd - size + 1;
        end = totalPage > tempEnd ? tempEnd: totalPage;

        prev = start > 1;
        next = totalPage > end;

        pageList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
        //=> IntStream : 기본자료형 int 형식의 연산에 최적화되어 있는 스트림 인터페이스
        //=> rangeClosed() : start ~ end 까지 즉, 종료값 포함 return 
        //=> boxed() : 숫자(int) 스트림을 일반스트림(객체형) 으로 변환
    } //makePageList
}//class