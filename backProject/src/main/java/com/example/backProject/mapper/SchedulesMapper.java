package com.example.backProject.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.backProject.entity.Schedules;

@Mapper
public interface SchedulesMapper {

    @Select("SELECT * FROM schedules WHERE scId = #{scId}")
    Schedules findById(@Param("scId") int scId);
    
    
    //월별로 로그인한 트레이너의 일정 전부 불러오기
    @Select("SELECT s.sc_id, s.date, s.pass_name, s.schedule_memo, s.user_id, " +
            "s.start_time, s.end_time, s.trainer_id, s.attendance, " +
            "u.name AS userName, t.name AS trainerName " +
            "FROM schedules s " +
            "LEFT JOIN users u ON s.user_id = u.user_id " +
            "LEFT JOIN users t ON s.trainer_id = t.user_id " +
            "WHERE YEAR(s.date) = #{year} " +
            "AND MONTH(s.date) = #{month} " +
            "AND s.trainer_id = #{trainerId}") //mybatis는 네이티브 쿼리이므로 컬럼네임 정확하게. 카멜 인식못함
    List<Schedules> findByYYYYmmAndTrainerId(@Param("year") int year, 
                                              @Param("month") int month, 
                                              @Param("trainerId") String trainerId);
    
    
    //수업한 총 날자 불러오기
    @Select("SELECT COUNT(*) AS attendanceCount FROM schedules WHERE user_id = #{userId} AND attendance IS NOT null")
    Integer CountScByUserId(@Param("userId") String userId);
    
    // 가장 가까운 전날 조회 쿼리
    @Select("SELECT date as pvdate FROM schedules " +
            "WHERE date < #{today} " +
    		"AND user_id = #{userId}" +
            "ORDER BY date DESC " +
            "LIMIT 1")
    LocalDate getPreviousSchedule(@Param("today") String today,
    								@Param("userId")String userId);

    // 가장 가까운 다음날 조회 쿼리
    @Select("SELECT date as nxdate FROM schedules " +
            "WHERE date >= #{today} " +
    		"AND user_id = #{userId}" +
            "ORDER BY date ASC " +
            "LIMIT 1")
    LocalDate getNextSchedule(@Param("today") String today,
    		                           @Param("userId")String userId);
    
    
    
    @Select("SELECT * FROM schedules WHERE trainerId = #{trainerId}")
    List<Schedules> findByTrainerId(@Param("trainerId") String trainerId);

    @Delete("DELETE FROM schedules WHERE scId = #{scId}")
    void deleteSchedule(@Param("scId") int scId);
}
