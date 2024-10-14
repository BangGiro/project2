import { useEffect, useState } from "react";
import { apiCall } from "../../../../service/apiService"

export default function GrantedPass({ selectUserId }) {
    const [gPass , setGpass] =  useState({});

    const roadGpassData = (selectUserId) =>{
        const uri=`/pass/find/${selectUserId}/gpass`;
        const token = localStorage.getItem('JwtToken');
        console.log('gpassPage'+selectUserId);

        apiCall(uri,'get',null,token)
        .then((response)=>{
            setGpass(response);
            console.log(gPass.passName);
        }).catch((err)=>{
            console.log('gpassRoadError'+err)
        })
    }

    useEffect(()=>{
        if(selectUserId) {
            roadGpassData(selectUserId);
        }
    },[ selectUserId ]);


    //디데이 계산
    const[ day , setDay ] = useState(null);
    useEffect(()=>{

        const nowDate = new Date();
        const endDate = new Date(gPass.endDate);

        setDay( Math.ceil((endDate.getTime() - nowDate.getTime())/(1000 * 60 * 60 * 24)) );
        
    },[gPass])

    return (
        <div>
            <p>{gPass.passName ? gPass.passName : '수강권이름'}</p>
            <p>{gPass.startDate ? `시작일: ${gPass.startDate}` : '시작일'}</p>
            <p>{day ? `D-${day}`:'D-day'}  </p>
            <p>{gPass.remainingUse ? `남은 수강 횟수: ${gPass.remainingUse}` : '남은 횟수'}</p>
        </div>

    )

}