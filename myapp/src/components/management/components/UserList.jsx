import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

function UserList({ users, onDeleteUser }) {
    if (!Array.isArray(users)) {
        return null;
    }

    return (
        <div className="managementuserlist">
            {users.map((user, index) => (
                <UserItem key={index} user={user} onDeleteUser={onDeleteUser} />
            ))}
        </div>
    );
}

export default UserList;
