import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserItem.css';
import { apiCall } from '../../../../service/apiService';

function UserItem({ user, onDeleteUser, onEditUser, onOpenEditModal }) {
    const navigate = useNavigate();

    const handleItemClick = () => {
        localStorage.setItem('selectedUser', JSON.stringify(user));
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
        const userId = user.userId;
        const url = `/users/removemember/${userId}`;
        const token = localStorage.getItem('JwtToken');

        console.log("삭제기능 체크"+userId);
        apiCall(url, "patch" , null , token)
        .then((response)=>{

            alert("내 회원에서 제외했습니다");
        }).catch((err)=>{

            alert(err);
        })
        
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
            <td>{user.phoneNumber}</td>
            <td>{user.gender}</td>
            <td>
                <button onClick={handleDeleteClick} >삭제</button>
                <button onClick={handleEditClick}>수정</button>
            </td>
        </tr>
    );
}

export default UserItem;
