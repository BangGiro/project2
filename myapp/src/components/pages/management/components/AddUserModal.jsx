import React, { useState, useEffect } from 'react';
import './AddUserModal.css';
import { apiCall } from "../../../../service/apiService";
import { Link, useNavigate } from "react-router-dom";

function AddUserModal({ onClose, onAddUser, existingUsers }) {
    const [searchUserId, setUserId] = useState('');
    const [message , setMessage] = useState('');
    const [memo, setMemo] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const auFindBtn = document.querySelector('.auFindBtn');
    const auAddBtn = document.querySelector('.auAddBtn');

    //사용자 찾기
    const handleFindUser = (e) => {
        e.preventDefault();

        const uri = "/users/finduser";
        const method = "post";
        const data = { userId : searchUserId };
        const token = localStorage.getItem("JwtToken");
        const trimStr = searchUserId.replaceAll(' ','');

        if(trimStr === '') {
            setMessage("검색어를 입력해주세요");
            return;
        } else {
            apiCall(uri, method, data, token)
            .then((Response) =>{
                
                setUser(Response);
                if(Response.userId != null) {

                    setMessage("회원찾기 성공");
                    auFindBtn.classList.add('auDisplayNone');
                    auAddBtn.classList.add('auDisplayNone');
                } else {
                    setMessage("해당하는 회원이 없습니다")
                }
            }).catch((err)=>{
                alert("회원찾기 실패"+err);
            })
        }


    };
    //사용자 추가
    const handleAdduser = () => {
        const isAdd = true;
        navigate('/signUp' , {state:{isAdd}} );
        return null;
    }

    const handleSubmit = () => {
        if (user) {

            const uri = "/users/addmember";
            const method = "put";
            const data = { userId : searchUserId , trainerId : localStorage.getItem('memberLoggedInData') };

            apiCall(uri, method, data, null)
            .then((Response) =>{
                setUser(Response);
            }).catch((err)=>{
                alert("회원추가 실패");
            })

            onAddUser(user);
            handleClose();
            window.location.reload();
        } else {
            alert('먼저 사용자를 찾으세요.');
        }
    };

    const handleClose = () => {
        setUserId('');
        setMemo('');
        setUser(null);
        onClose();
    };

    return (
        <div className='addusermodal'>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <h2>회원 추가</h2>
                    {message && <p>{message}</p>}
                    <input
                        type="text"
                        className='addUserInput'
                        value={searchUserId}
                        onChange={handleUserIdChange}
                        placeholder="아이디 입력"
                    />
                    <button onClick={handleFindUser} className='auFindBtn'>찾기</button>
                    <button onClick={handleAdduser} className='auAddBtn'>추가</button>
                    {user && (
                        <div className='AufindResultBox'>
                            <p>이름: {user.name}</p>
                            <p>번호: {user.phoneNumber}</p>
                            <button onClick={handleSubmit}>완료</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;
