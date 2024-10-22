import { useEffect, useState } from 'react'
import './UserDetail.css'
import { useNavigate } from 'react-router-dom';
import GrantedPass from './GrantedPass';
import { apiCall } from '../../../../service/apiService';

export default function UserDetail({ selectUser }) {

    const[member,setMember] = useState(null);
    const[classLogs,setClassLogs] = useState(null);
    
    const navigate = useNavigate();

    const toExercise = (e) => {
        let user = selectUser;
        e.preventDefault();
        navigate('/exerciseUser' , { state: user }); // 링크 변경
    };

    const roadClassLogs = () =>{
        let userId = selectUser.userId;
        let today = new Date().toISOString().split('T')[0];
        const url = `/sc/attdLogs/${userId}/${today}`
        const token = localStorage.getItem('JwtToken');

        apiCall(url, 'get', null , token)
        .then((response)=>{
            setClassLogs(response);
        }).catch((err)=>{
            alert('로드실패');
        })
    }

    useEffect(()=> {
        if(selectUser?.userId != null) {
            roadClassLogs();
        } else {
            return;
        }
     } ,[selectUser])

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
                <p>
                <span>수업 횟수 </span>
                {classLogs && <span>{classLogs.attendanceCount}</span>}
                </p> 
                
                <p>
                <span>지난 수업일 </span>
                {classLogs?.pvdate ? <span> {classLogs.pvdate}</span> : <span> 없음</span>}    
                </p>

                <p>
                <span>다음 수업일 </span>
                {classLogs?.nxdate ? <span> {classLogs.nxdate}</span> : <span> 없음</span>}
                </p>

                <button onClick={()=>{navigate('/fullcalendar')}}>일정관리</button>
            </div>
            
            <div className="UD_exercises">
                <p>운동 관리</p>
                {selectUser &&
                <button onClick={toExercise}>운동 기록</button>
                }
            </div>
        </div>
    )
}