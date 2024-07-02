import React from 'react';
import './UserItem.css';

function UserItem({ user, onDeleteUser }) {
    return (
        <div className="managementuseritem">
            <img src="/image/profile.webp" alt="프로필사진" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <button onClick={() => onDeleteUser(user.email)}>삭제</button>
        </div>
    );
}

export default UserItem;
