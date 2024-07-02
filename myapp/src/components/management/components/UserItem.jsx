import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserItem.css';

function UserItem({ user, onDeleteUser }) {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate('/exerciseUser'); // 링크 변경
    };

    return (
        <div className="managementuseritem" onClick={handleItemClick}>
            <img src="/image/profile.webp" alt="프로필사진" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <button onClick={(e) => { e.stopPropagation(); onDeleteUser(user.email); }}>삭제</button>
        </div>
    );
}

export default UserItem;
