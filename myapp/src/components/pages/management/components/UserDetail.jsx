import { useEffect, useState } from 'react'
import './UserDetail.css'
import { useNavigate } from 'react-router-dom';
import GrantedPass from './GrantedPass';

export default function UserDetail({ selectUser }) {

    const[member,setMember] = useState(null);
    // console.log("useDetailPageTest"+selectUser); //prop테스트
    
    const navigate = useNavigate();


    return (
        <div className="UD_container">
            <div className="UD_basic_info">
                {selectUser ? <p>{selectUser.name}</p> : <p>이름</p> }
                {selectUser ? <p>{selectUser.phoneNumber}</p> : <p>전화번호</p> }
            </div>

            <div className="UD_pass_info">
                {selectUser && <GrantedPass  selectUserId={selectUser.userId} />}

                <button onClick={()=>{navigate('/passmng' , { state: selectUser })}}>수강권 관리</button>
            </div>

            <div className="UD_logs">
                <div>수업 횟수</div>
                <div>지난 수업일</div>
                <div>다음 수업일</div>
                <button>일정관리</button>
            </div>

            <div className="UD_exercises">
                <div>일지 작성</div>
                <div>운동 기록</div>
                <div>운동 통계</div>
            </div>
        </div>
    )

}