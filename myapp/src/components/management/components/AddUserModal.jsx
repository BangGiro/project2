import React, { useState, useEffect } from 'react';
import './AddUserModal.css';

function AddUserModal({ onClose, onAddUser }) {
    const [email, setEmail] = useState('');
    const [memo, setMemo] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const storedUsers = JSON.parse(localStorage.getItem('userData')) || [];
        if (Array.isArray(storedUsers)) {
            const matchedUser = storedUsers.find((u) => u.email === e.target.value);
            if (matchedUser) {
                setUser(matchedUser);
            } else {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    const handleSubmit = () => {
        if (user) {
            onAddUser(user, memo);
            handleClose();
        } else {
            alert('No user found with this email');
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
