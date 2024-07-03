import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserItem.css';

function UserItem({ user, onDeleteUser, onEditUser, onOpenEditModal }) {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate('/exerciseUser'); // 링크 변경
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
    

    const getProfileImage = (gender) => {
        if (gender === '여자') {
            return '/image/femaleprofile.PNG'; // 여자 프로필 이미지 경로 설정
        }
        return '/image/profile.webp'; // 남자 프로필 이미지 경로 설정
    };

    return (
        <tr className="user-item-row" onClick={handleItemClick}>
            <td><img src={getProfileImage(user.gender)} alt="프로필사진" className="user-image" /></td>
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
