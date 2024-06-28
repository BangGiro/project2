import React from 'react';
import './UserItem.css';

function UserItem({ user }) {
    return (
        <div className="managementuseritem">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <p>{user.memo}</p>
        </div>
    );
}

export default UserItem;
