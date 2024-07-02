import React, { useState, useEffect } from 'react';
import './AddUserModal.css';

function AddUserModal({ onClose, onAddUser, existingUsers }) {
    const [email, setEmail] = useState('');
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
    }, [email]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFindUser = () => {
        const loggedInEmail = localStorage.getItem('loggedInEmail');

        if (email === loggedInEmail) {
            alert('본인은 추가할 수 없습니다.');
            return;
        }

        if (existingUsers.some((u) => u.email === email)) {
            alert('이미 추가된 회원입니다.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('dummyUserData')) || [];
        const storedpUsers = JSON.parse(localStorage.getItem('userData')) || [];

        const allUsers = [...storedUsers, ...storedpUsers]; // 두 배열을 합침

        const matchedUser = allUsers.find((u) => u.email === email);
        if (matchedUser) {
            setUser(matchedUser);
        } else {
            setUser(null);
            alert('사용자를 찾을 수 없습니다.');
        }
    };

    const handleSubmit = () => {
        if (user) {
            const memberLoggedInData = JSON.parse(localStorage.getItem('MemberLoggedInData')) || [];
            if (!memberLoggedInData.includes(user.email)) {
                const updatedMemberLoggedInData = [...memberLoggedInData, user.email];
                localStorage.setItem('MemberLoggedInData', JSON.stringify(updatedMemberLoggedInData));
            }

            onAddUser(user, memo);
            handleClose();
        } else {
            alert('먼저 사용자를 찾으세요.');
        }
    };

    const handleClose = () => {
        setEmail('');
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
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="이메일 입력"
                    />
                    <button onClick={handleFindUser}>사용자 찾기</button>
                    {user && (
                        <div>
                            <p>이름: {user.name}</p>
                            <p>성별: {user.gender}</p>
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
