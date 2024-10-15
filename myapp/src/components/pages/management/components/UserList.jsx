import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

function UserList({ users, onEditUser, onOpenEditModal }) {

    
    if (!Array.isArray(users)) {
        return null;
    }

    return (
        <div className="user-list-container">
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>프로필</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>성별</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserItem
                            key={user.userId}
                            user={user}
                            onEditUser={onEditUser}
                            onOpenEditModal={onOpenEditModal}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
