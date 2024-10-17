import { useState , useEffect, createContext } from "react";
import UserList from "../management/components/UserList"
import Management from "../management/components/Management";
import { apiCall } from "../../../service/apiService";
import './AddSc.css'


export const ScContext = createContext();

export default function AddSc({ close , users, scDate }) {

const[member, setMember] = useState({});
const[gPass , setGpass] = useState({});
const[addScData , setAddScData] = useState({}); //DB에 담을 총 데이터
const [endTime, setEndTime] = useState(''); //시간계산용

const closeModal = (e) =>{
    e.preventDefault();
    close(false);
}

const getMemberData = (user) => {
    setMember(user);
}

//선택한 유저 pass찾아오기
const getMemberPassData = () =>{
    let memberId = member.userId;
    const uri=`/pass/find/${memberId}/gpass`;
    const token = localStorage.getItem('JwtToken');

    apiCall(uri,'get',null,token)
    .then((response)=>{
        setGpass(response);
    }).catch((err)=>{
        console.log('gpassRoadError'+err)
    })
}

useEffect(getMemberPassData,[member]);


//input값 일괄관리
const handleChange = (e) => {
    const { id, value } = e.target;
    const localeScDate = new Date(scDate); 

    setAddScData(prevState => ({
        ...prevState,
        userId: member.userId,
        passName: gPass.passName,
        trainerId: localStorage.getItem('memberLoggedInData'),
        date : localeScDate.toLocaleDateString('en-CA'), //js에서 date가 하루 앞당겨지는걸 방지
        endTime : endTime,
        [id]: value
    }));

    if(id == 'endTime') setEndTime(e.value);
};

//시간계산 (기본 +50분) 
const calculateEndTime = () => {

    if(addScData.startTime) {
        const [hours, minutes] = addScData.startTime.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes);

        // 50분 더하기
        startTime.setMinutes(startTime.getMinutes() + 50);

        // 시간과 분을 2자리 포맷으로 변환
        const endHours = String(startTime.getHours()).padStart(2, '0');
        const endMinutes = String(startTime.getMinutes()).padStart(2, '0');

        // 종료 시간 설정
        setEndTime(`${endHours}:${endMinutes}`);
    } else {
        return;
    }
        
  };

//비동기 관련 처리
useEffect(calculateEndTime,[addScData.startTime])

//서버에 request
const submit = (e) => {
    e.preventDefault();

    const uri = '/sc/save';
    const token = localStorage.getItem('')

    apiCall(uri,'post',addScData,token)
    .then((response)=>{
        alert('저장되었습니다');
        close(false);
    }).catch((err)=>{
        alert('실패'+err);
    })

}


//렌더링 파트=====================================================================
    return (
        <div className="addScModalBg">
            <div className="addScModal">
                <button onClick={closeModal} className="closeBtn">닫기</button>
                
                <section className="ScSc1">
                    <form className="addScForm">
                        <h4>회원</h4>
                        <div className="ScMemberInfo"> 
                            {member && 
                            <div>
                                <p>{member.name}</p> 
                                <p>{member.phoneNumber}</p>
                            </div>
                            }
                        </div>
                        
                        <h4>수강권 정보</h4>
                        <div className="ScPassInfo">
                            <p>수강권 이름 : {gPass.passName}</p>
                            <p>유효 기한 : {gPass.startDate} ~ {gPass.endDate}</p>
                            <p>잔여횟수 : {gPass.remainingUse}</p>
                        </div>

                        <label for='startTime'> 시작시간 
                            <input 
                            type='time'
                            id='startTime'
                            onChange={handleChange}
                            />
                        </label>

                        <label for='endTime'> 종료시간
                            <input 
                            type='time'
                            id='endTime'
                            value={endTime}
                            onChange={handleChange}
                            />
                        </label>

                        <label for='scheduleMemo'> 메모 </label>
                            <textarea 
                            type='textarea'
                            id='scheduleMemo'
                            onChange={handleChange}
                            />
                        
                        <button onClick={submit}> 저장하기 </button>
                    </form>
                </section>
                
                <ScContext.Provider value={{getMemberData}}>
                    <section className="ScSc2">
                            <Management users={users} isSc={true}/>
                    </section>
                </ScContext.Provider>
            </div>
        </div>
    )

}