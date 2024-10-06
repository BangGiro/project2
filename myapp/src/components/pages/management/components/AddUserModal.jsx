import React, { useState, useEffect } from 'react';
import './AddUserModal.css';
import { apiCall } from "../../../../service/apiService";

function AddUserModal({ onClose, onAddUser, existingUsers }) {
    const [searchUserId, setUserId] = useState('');
    const [memo, setMemo] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            } else if (e.key === 'Enter') {
                handleFindUser();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleFindUser = (e) => {

        const uri = "/users/finduser";
        const method = "post";
        const data = { userId : searchUserId };
        const token = localStorage.getItem("JwtToken");

        apiCall(uri, method, data, token)
        .then((Response) =>{
            
            setUser(Response);

            alert("회원찾기 성공");
        }).catch((err)=>{
            alert("회원찾기 실패"+err);
        })
    };

    const handleSubmit = () => {
        if (user) {

            const uri = "/users/adduser";
            const method = "put";
            const data = { userId : searchUserId , trainerId : localStorage.getItem('memberLoggedInData') };

            apiCall(uri, method, data, null)
            .then((Response) =>{
                setUser(Response);
                alert("회원추가 성공");
            }).catch((err)=>{
                alert("회원추가 실패");
            })

            onAddUser(user, memo);
            handleClose();
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
                    <input
                        type="text"
                        value={searchUserId}
                        onChange={handleUserIdChange}
                        placeholder="이메일 입력"
                    />
                    <button onClick={handleFindUser}>사용자 찾기</button>
                    {user && (
                        <div>
                            <p>이름: {user.name}</p>
                            <p>성별: {user.phoneNumber}</p>
                            <textarea
                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                                placeholder="메모 추가"
                            />
                        </div>
                    )}
                    <button onClick={handleSubmit}>완료</button>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;
