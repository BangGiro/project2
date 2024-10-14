import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import './Schedules.css'
import DetailSc from './DetailSc'
import { useState, useEffect} from 'react';
import { apiCall } from '../../../service/apiService';


function ScheduleCalendar() {

    const[dateStr , setDateStr] = useState();

    const handleDateClick = (info) => {
        setDateStr(info.dateStr);
    }

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
    

    return (

        <div className='Schedules_container'> 
            <div className='fc_container'>
                <FullCalendar
                    plugins={[dayGridPlugin , interactionPlugin]}
                    initialView='dayGridMonth'
                    weekends={false}
                    selectable={true}
                    dateClick={handleDateClick}
                />
            </div>

            <DetailSc 
            today={dateStr}
            users={members}/>
        </div>

    )

}

export default ScheduleCalendar;