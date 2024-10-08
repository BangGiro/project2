import './DetailSc.css'
import AddSc from './AddSc';
import { useState } from 'react';

function DetailSc() {
    const [openSwitch , setOpenSwitch] = useState(false);


    return (

        <div className="detailSc_container">

            <div className="dailySc">
                <h2>오늘의 일정</h2>
                <div className='dailySc_details'>
                    <p>시간</p>
                    <p>수업유형</p>
                    <p>회원이름</p>
                    <p>회원 전화번호</p>
                </div>
            </div>
            
            {openSwitch && <AddSc close={setOpenSwitch}/>}

            <div className="ScEdits">
                <button onClick={()=>{setOpenSwitch(true)}}>일정 추가</button>
            </div>
            
        </div>

    )
} 

export default DetailSc;