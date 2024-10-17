import { useEffect, useState } from 'react'
import './UserDetail.css'
import { useNavigate } from 'react-router-dom';
import GrantedPass from './GrantedPass';

export default function UserDetail({ selectUser }) {

    const[member,setMember] = useState(null);
    // console.log("useDetailPageTest"+selectUser); //prop테스트
    
    const navigate = useNavigate();

    const toExercise = (e) => {
        let user = selectUser;
        e.preventDefault();
        navigate('/exerciseUser' , { state: user }); // 링크 변경
    };

    return (
        <div className="UD_container">
            <h2>회원 정보</h2>
            <div className="UD_basic_info">
                {selectUser ? <p><i className="fa-regular fa-user"></i> {selectUser.name}</p> : <p>이름</p> }
                {selectUser ? <p><i className="fa-solid fa-phone"></i> {selectUser.phoneNumber}</p> : <p>전화번호</p> }
            </div>

            <div className="UD_pass_info">
                {selectUser ? <GrantedPass  selectUserId={selectUser.userId}/>
                : <p>수강권이 없습니다</p>
                }
                
                {selectUser &&
                    <button onClick={()=>{navigate('/passmng' , { state: selectUser })}}>수강권 관리</button>
                }
            </div>
            
            <div className="UD_logs">
                <div>수업 횟수</div>
                <div>지난 수업일</div>
                <div>다음 수업일</div>
                <button onClick={()=>{navigate('/fullcalendar')}}>일정관리</button>
            </div>
            
            <div className="UD_exercises">
                <div>일지 작성</div>
                <div>운동 통계</div>
                {selectUser &&
                <button onClick={toExercise}>운동 기록</button>
                }
            </div>
        </div>
    )

}