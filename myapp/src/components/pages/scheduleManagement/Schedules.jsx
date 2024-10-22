import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import './Schedules.css'
import DetailSc from './DetailSc'
import { useState, useEffect} from 'react';
import { apiCall } from '../../../service/apiService';


function ScheduleCalendar() {

    const[dateStr , setDateStr] = useState();
    const [monthData , setMonthData] = useState([]);
    const [events, setEvents] = useState({});


    //마운트시 날자 데이터 받아오기
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
        setDateStr(formattedDate);
    }, []);

    //해당 날자 클릭시 해당 date스트링 반환
    const handleDateClick = (info) => {
        setDateStr(info.dateStr);
    }

// 월 넘기는 버튼 클릭시 해당 월 date 스트링 반환
const handleDatesSet = (dateInfo) => {
    const startDate = new Date(dateInfo.start);
    startDate.setHours(startDate.getHours() + 9); // 한국 시간으로 맞추기
    startDate.setDate(startDate.getDate() + 6); //달력 넘길때 전 월 날자가 들어가는 오류 땜빵용

    // "YYYY-MM-DD" 형식으로 변환
    const formattedDate = startDate.toISOString().split('T')[0];
    setDateStr(formattedDate); // dateStr 업데이트
};
    

    const[members , setMembers] = useState(null);

    //users찾아보내기
    useEffect(() => {
            const uri = "/users/finduserlist";
            const method = "post";
            const data = { trainerId : localStorage.getItem('memberLoggedInData') };
            const token = localStorage.getItem("JwtToken");
            
            apiCall(uri, method, data, token)
            .then((Response) =>{

                if(Response != null) {
                    setMembers(Response);
                } else {
                    setMembers([]);
                    alert("회원이 없습니다");
                }
    
            }).catch((err)=>{
                alert("권한이 없습니다");
            })
    }, []); // Optional chaining 사용
    

    //해당년도 월별로 서버에 데이터 받아오기
    const roadScData = () => {

        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(5,7));
        const trainerId = localStorage.getItem('memberLoggedInData');
        const token = localStorage.getItem('JwtToken');
    
        const url = `/sc/road/${year}/${month}/${trainerId}`;
    
        apiCall(url,'get',null,token)
        .then((response)=>{
    
            setMonthData(response)
                
        }).catch((err)=>{
            alert('불러오기 실패'+err.message);
        });
            
    };
        
    useEffect(()=>{if(dateStr) { roadScData(); }},[dateStr]);
    
     useEffect(()=>{
        const mapEvents = monthData.map((item) => {
            const date = item.date;
            return {
                start: date,
                title: `PT ${item.userName}`,
                allDay: true,
            };
        });
        setEvents(mapEvents)
    },[monthData])


    return (

        <div className='Schedules_container'> 
            <div className='fc_container'>
                <FullCalendar
                    plugins={[dayGridPlugin , interactionPlugin]}
                    initialView='dayGridMonth'
                    weekends={true}
                    selectable={true}
                    // locales={[koLocale]} 
                    dateClick={handleDateClick}
                    events={events}
                    showNonCurrentDates={false}
                    timeZone='local'
                    datesSet={handleDatesSet} //월 변경시 작동
                />
            </div>

            <DetailSc 
            date={dateStr}
            users={members}
            monthData={monthData}/>
        </div>

    )

}

export default ScheduleCalendar;