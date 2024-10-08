import { useState , useEffect } from "react";
import UserList from "../management/components/UserList"
import { apiCall } from "../../../service/apiService";
import './AddSc.css'

export default function AddSc({ close }) {

    const[members , setMembers] = useState(null);

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


const closeModal = () =>{
    close(false);
}


//렌더링 파트=====================================================================
    return (
        <div className="addScModalBg">
            <div className="addScModal" onClick={closeModal}>
                
            </div>
        </div>
    )

}