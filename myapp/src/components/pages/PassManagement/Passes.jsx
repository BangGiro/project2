import { useEffect, useState } from "react";
import { apiCall } from "../../../service/apiService";
import { Navigate, useNavigate  } from "react-router-dom";



export default function Passes({data , selectUser}) {
    const [grantData , setGrantData ] = useState({userId : selectUser.userId});
    const [startDate , setStartDate ] = useState('');
    const token = localStorage.getItem('JwtToken');

    //시작일 관리
    const handleChange = (e) => {
        setStartDate(e.target.value);
    };
    
    //비동기적 수강권 데이터 관리

    useEffect(()=>{setData()},[startDate])
    
    const setData = () => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + data.expiry);

        console.log(grantData.userId);
        console.log(startDate);
        console.log(endDate);

        setGrantData(prevState => ({
            ...prevState,
            passName : data.passName,
            remainingUse : data.defaultUses,
            startDate : startDate,
            endDate : endDate
        }))
    }

    const grantPass = (e) => {

        e.preventDefault();//작성 안할 시 강제 새로고침되면서 데이터 초기화됨

        const uri='/pass/grant';

        apiCall(uri, 'post', grantData, token)
        .then((response)=>{

            alert('부여성공');


        }).catch((err)=>{

            alert('부여실패'+err);

        })
    }


    return (

        <div className="PLbox">
            <section className="PLinfo">
                <p>수강권: {data.passName}</p>
                <p>부여 회차: {data.defaultUses}</p>
                <p>기한: {data.expiry}</p>
            </section>
            <section className="PLbuttons">
                {selectUser &&
                    <form className="grantPassForm">
                        <label> 시작일 
                            <input 
                            type='date'
                            id = 'startDate'
                            onChange={handleChange}
                            required/>
                        </label>
                        <button onClick={grantPass}>부여하기</button>
                    </form>
                }
            </section>
        </div>

    )

}