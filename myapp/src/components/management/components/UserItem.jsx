import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserItem.css';

function UserItem({ user, onDeleteUser, onEditUser, onOpenEditModal }) {
    const navigate = useNavigate();

    const handleItemClick = () => {
        localStorage.setItem('selectedUser', JSON.stringify(user));
        navigate('/exerciseUser');
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEditUser(user);
        onOpenEditModal();
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDeleteUser(user.email);
    };

    return (
        <tr className="user-item-row" onClick={handleItemClick}>
            <td><img src="/image/profile.webp" alt="프로필사진" className="user-image" /></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>
                <button onClick={handleDeleteClick}>삭제</button>
                <button onClick={handleEditClick}>수정</button>
            </td>
        </tr>
    );
}

export default UserItem;
