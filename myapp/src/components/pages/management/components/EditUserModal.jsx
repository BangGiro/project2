import React, { useState, useEffect } from 'react';
import './AddUserModal.css'; // AddUserModal의 CSS를 재사용

function EditUserModal({ onClose, onEditUser, user }) {
    const [memo, setMemo] = useState(user.memo);

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

    const handleSubmit = () => {
        const updatedUser = { ...user, memo };
        onEditUser(updatedUser);
        handleClose();
    };

    const handleClose = () => {
        setMemo('');
        onClose();
    };

    return (
        <div className='addusermodal'>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <h2>회원 메모 수정</h2>
                    <p>이름: {user.name}</p>
                    <p>이메일: {user.email}</p>
                    <p>성별: {user.gender}</p>
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="메모 수정"
                    />
                    <button onClick={handleSubmit}>완료</button>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;
