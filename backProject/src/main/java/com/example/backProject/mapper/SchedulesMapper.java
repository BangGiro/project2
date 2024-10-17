package com.example.backProject.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.backProject.entity.Schedules;

@Mapper
public interface SchedulesMapper {

    @Select("SELECT * FROM schedules WHERE scId = #{scId}")
    Schedules findById(@Param("scId") int scId);
    
    
    //월별로 로그인한 트레이너의 일정 전부 불러오기
    @Select("SELECT s.sc_id, s.date, s.pass_name, s.schedule_memo, s.user_id, " +
            "s.start_time, s.end_time, s.trainer_id, " +
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
    

    @Select("SELECT * FROM schedules WHERE trainerId = #{trainerId}")
    List<Schedules> findByTrainerId(@Param("trainerId") String trainerId);

    @Insert("INSERT INTO schedules (scId, date, passName, scheduleMemo, userId, startTime, endTime, trainerId) " +
            "VALUES (#{scId}, #{date}, #{passName}, #{scheduleMemo}, #{userId}, #{startTime}, #{endTime}, #{trainerId})")
    void insertSchedule(Schedules schedule);

    @Update("UPDATE schedules SET date = #{date}, passName = #{passName}, scheduleMemo = #{scheduleMemo}, " +
            "userId = #{userId}, startTime = #{startTime}, endTime = #{endTime}, trainerId = #{trainerId} " +
            "WHERE scId = #{scId}")
    void updateSchedule(Schedules schedule);

    @Delete("DELETE FROM schedules WHERE scId = #{scId}")
    void deleteSchedule(@Param("scId") int scId);
}
