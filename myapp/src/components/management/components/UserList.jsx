import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

function UserList({ users }) {
    if (!Array.isArray(users)) {
        return null;
    }

    return (
        <div className="managementuserlist">
            {users.map((user, index) => (
                <UserItem key={index} user={user} />
            ))}
        </div>
    );
}

export default UserList;
