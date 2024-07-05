import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

function UserList({ users, onDeleteUser, onEditUser, onOpenEditModal }) {
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
                        <th>이메일</th>
                        <th>성별</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserItem
                            key={index}
                            user={user}
                            onDeleteUser={onDeleteUser}
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
