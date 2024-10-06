import React, { useEffect, useState } from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import { getLoggedInUser } from '../helpers/auth'; // isLoggedIn 삭제
import './ManagementContainer.css';
import { apiCall } from '../../../service/apiService';
import { Navigate } from 'react-router-dom';

function ManagementContainer() {
    const [memberNames, setMemberNames] = useState([]);
    const [users, setUsers] = useState([]);
    const [isCategoryVisible, setIsCategoryVisible] = useState(true);
    const user = localStorage.getItem("JwtToken");

    useEffect(() => {
        
        if (user) {

            const uri = "/users/finduserlist";
            const method = "post";
            const data = { trainerId : localStorage.getItem('memberLoggedInData') };
            const token = localStorage.getItem("JwtToken");

            apiCall(uri, method, data, token)
            .then((Response) =>{
                
                if(Response != null) {
                    setUsers(Response);

                } else {
                    setUsers([]);
                    alert("회원이 없습니다");
                }

            }).catch((err)=>{
                alert("권한이 없습니다");
            })

        }
    }, []); // Optional chaining 사용


    //유저리스트 관리
    const handleAddUser = (newUser, memo) => {
        const updatedUser = { ...newUser, memo, trainer: user.email };
        const updatedUsers = [...users, updatedUser];
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => ({ name: user.name, phoneNumber: user.phoneNumber })));
    };

    const handleDeleteMember = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => ({ name: user.name })));
        localStorage.setItem(`users_${user.email}`, JSON.stringify(updatedUsers));
    };

    const handleDeleteAllUsers = () => {
        if (window.confirm('모든 회원을 삭제하시겠습니까?')) {
            const updatedUsers = [];
            setUsers(updatedUsers);
            setMemberNames(updatedUsers);
            localStorage.removeItem(`users_${user.email}`);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsCategoryVisible(false);
            } else {
                setIsCategoryVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="management-container">
            {isCategoryVisible && (
                <div className='manacategory'>
                    <CategoryContainer memberNames={memberNames} />
                </div>
            )}
            <div className='maco'>
                <Management
                    onAddUser={handleAddUser}
                    onDeleteUser={handleDeleteMember}
                    onDeleteAllUsers={handleDeleteAllUsers}
                    users={users}
                />
            </div>
        </div>
    );
}

export default ManagementContainer;
