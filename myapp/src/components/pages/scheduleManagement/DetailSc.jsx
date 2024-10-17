import './DetailSc.css'
import AddSc from './AddSc';
import { useEffect, useState } from 'react';
import { apiCall } from '../../../service/apiService';
import DetailScList from './DetailScList';

function DetailSc({date , users, monthData }) {
    
    const [openSwitch , setOpenSwitch] = useState(false);

    return (

        <div className="detailSc_container">

            <h2>{date}</h2>
            <table className='detailSc_table'>
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>이름</th>
                        <th>담당</th>
                        <th>출결처리</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <DetailScList date={date} monthData={monthData}/>
            </table>
            {openSwitch && 
            <AddSc 
            close={setOpenSwitch}
            users={users}
            scDate={date}
            />}

            <div className="ScEdits">
                <button onClick={()=>{setOpenSwitch(true)}}>일정 추가</button>
            </div>

        </div>

    )
} 

export default DetailSc;