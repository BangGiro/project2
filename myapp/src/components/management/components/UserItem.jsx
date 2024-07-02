import React from 'react';
import './UserItem.css';

function UserItem({ user }) {
    return (
        <div className="managementuseritem">
            <img src="/image/profile.webp" alt="프로필사진" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.gender}</p>
        </div>
    );
}

export default UserItem;
