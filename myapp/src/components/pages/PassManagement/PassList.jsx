import { useEffect, useState } from "react"
import { apiCall } from "../../../service/apiService"
import "./PassList.css";
import Passes from "./Passes";

export default function PassList({ selectUser , update }) {
    let userId = localStorage.getItem('memberLoggedInData');
    const [passes , setPasses] = useState([]);

    useEffect(()=>{  roadPasses()  },[]) //return렌더링 후에 실행됨
    useEffect(()=>{  roadPasses()  },[update])

    const roadPasses = () => {
        const uri = `/pass/find/${userId}/passes`;
        const token = localStorage.getItem('JwtToken');

        apiCall(uri,'get',null,token)
        .then((response)=>{

            if(response){
                setPasses(response);
            } else {
                return;
            }

        }).catch((err)=>{
            console.log(err);
            alert('수강권 불러오기 오류');
        })
    }


    return (
        <div>
            {passes && selectUser && passes.map((data,index)=>(
                <div key={index} className="PLcontainer">
                    <Passes 
                    data={data}
                    selectUser={selectUser}/>
                </div>
            ))}
        </div>
    )    

}