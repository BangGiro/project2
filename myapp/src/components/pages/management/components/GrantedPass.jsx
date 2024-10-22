import { useEffect, useState } from "react";
import { apiCall } from "../../../../service/apiService"
import "./GrantedPass.css"

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
        <div className="gPassDetailBox">
            <p className="gpTitle"><i className="fa-solid fa-ticket"></i>{gPass.passName ? gPass.passName : '수강권이 없습니다'}</p>
            <span>수강 시작</span>
            <p>{gPass.startDate ? `${gPass.startDate}` : ''}
                <span className="D_day_span">{day ? ` (D-${day})`:''}</span>
            </p>
            <span>남은 수업</span>
            <span>{gPass.remainingUse ? `${gPass.remainingUse} 회` : ''}</span>
        </div>

    )

}