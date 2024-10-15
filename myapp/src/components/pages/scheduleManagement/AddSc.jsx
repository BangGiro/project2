import { useState , useEffect } from "react";
import UserList from "../management/components/UserList"
import Management from "../management/components/Management";
import { apiCall } from "../../../service/apiService";
import './AddSc.css'

export default function AddSc({ close , users }) {



const closeModal = (e) =>{
    e.preventDefault();
    close(false);
}


//렌더링 파트=====================================================================
    return (
        <div className="addScModalBg">
            <div className="addScModal">
                <button  onClick={closeModal}>닫기</button>
                <form>
                    <Management users={users}/>
                </form>
            </div>
        </div>
    )

}