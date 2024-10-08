import { useEffect, useState } from 'react'
import './UserDetail.css'


export default function UserDetail({ selectUser }) {

    const[member,setMember] = useState(null);
    
    console.log("useDetailPageTest"+selectUser);

    return (
        <div className="UD_container">
            <div className="UD_basic_info">
                {selectUser ? <p>{selectUser.name}</p> : <p>오류</p> }
                <p>전화번호</p>
                <p>등록일</p>
            </div>

            <div className="UD_pass_info">
                <p>수강권이름</p>
                <div>수강권 기한</div>
                <div>수강권 기본 사용가능 횟수</div>
                <div>수강권 남은 사용가능 횟수</div>
            </div>

            <div className="UD_logs">
                <div>수업 횟수</div>
                <div>지난 수업일</div>
                <div>다음 수업일</div>
            </div>

            <div className="UD_exercises">
                <div>일지 작성</div>
                <div>운동 기록</div>
                <div>운동 통계</div>
            </div>
        </div>
    )

}