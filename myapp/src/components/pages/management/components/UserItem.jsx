import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserItem.css';
import { apiCall } from '../../../../service/apiService';
import { UserContext } from '../ManagementContainer';
import { ScContext } from '../../scheduleManagement/AddSc';

function UserItem({ user, isSc , ScMember }) {
    const userContext = useContext(UserContext);
    const scContext = useContext(ScContext);
    const setUserDetail = userContext?.setUserDetail || (()=>{});//방어코드
    const getMemberData = scContext?.getMemberData || (()=>{});

    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate('/exerciseUser' , { state: user }); // 링크 변경
    };

    const handleDetailClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setUserDetail(user);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();

        if(window.confirm("정말 삭제하시겠습니까?")) { //그냥 confirm은 안됨 eslint오류
            const userId = user.userId;
            const url = `/users/removemember/${userId}`;
            const token = localStorage.getItem('JwtToken');
    
            apiCall(url, "patch" , null , token)
            .then((response)=>{
                alert("내 회원에서 제외했습니다");
                window.location.reload();
            }).catch((err)=>{
                alert(err);
            })
        } else {
            return;
        }
    };

    //full캘린더로 전달
    const handleSelect = (e) => {
        e.preventDefault();
        getMemberData(user);
    }
    

    return (
        <tr className="user-item-row" onClick={handleDetailClick}>
            <td>{user.name}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.gender}</td>
            <td>
                {!isSc && <button onClick={handleDeleteClick} >삭제</button>}
                {isSc && <button onClick={handleSelect}>선택</button>}
            </td>
        </tr>
    );
}

export default UserItem;
