
import { useState } from 'react';
import './PassManagement.css';
import { apiCall } from '../../../service/apiService';
import PassList from './PassList';
import {  useLocation } from 'react-router-dom';

export default function PassManage() {

    const [newPass,setNewPass] = useState({userId : localStorage.getItem('memberLoggedInData')}); 

    //navlink state객체 받기
    const location = useLocation();
    const selectUser = location.state;//passList로 전달

    //비동기 값 변화 일괄 관리
    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewPass(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        const uri = '/pass/add';
        const token = localStorage.getItem('JwtToken');
        
        apiCall(uri,'post',newPass,token)
        .then((Response)=>{
            
            alert("추가성공");

        }).catch((err)=>{

            alert("오류"+err);
        });
    }


    return(
        <div>
            <div className="PMcontainer">
                <div> 수강권 리스트 
                    <PassList
                        selectUser={selectUser}
                    />
                </div>
                <div className="addPassBox"> 수강권 추가
                    <form className="addPassForm">
                        <section>
                        <label for="passName" >수강권 이름 </label>
                            <input 
                            type="text"
                            id="passName"
                            placeholder='최대 30자'
                            onChange={handleChange}
                            className='psName_input'
                            required
                            />

                        </section>
                        
                        <section>
                            <label for="defaultUses"> 수강 횟수 </label>
                                <input 
                                type="number"
                                id="defaultUses"
                                min='1'
                                step="1"
                                className='psUse_input'
                                onChange={handleChange}
                                required
                                />
                            

                            <label for="expiry"> 사용 기한 </label>
                                <input 
                                type="number"
                                id="expiry"
                                placeholder='단위는 하루입니다'
                                min="1"
                                step="1"
                                className='pExp_input'
                                onChange={handleChange}
                                required
                                />
                            
                        </section>
                        <button onClick={submit}>저장하기</button>
                    </form>
                </div>
                <div> 수강권 수정 </div>
            </div>
        </div>
    )

}