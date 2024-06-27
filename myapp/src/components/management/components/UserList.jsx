import React from 'react';
import UserItem from './UserItem';

function UserList({ users }) {
    if (!Array.isArray(users)) {
        return null;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {users.map((user, index) => (
                <UserItem key={index} user={user} />
            ))}
        </div>
    );
}

export default UserList;
