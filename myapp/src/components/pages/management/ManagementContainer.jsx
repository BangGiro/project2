import React, { useEffect, useState } from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import { getLoggedInUser, isLoggedIn } from '../helpers/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import './ManagementContainer.css';

function ManagementContainer() {
    const [memberNames, setMemberNames] = useState([]);
    const [users, setUsers] = useState([]);
    const [isCategoryVisible, setIsCategoryVisible] = useState(true); // 카테고리 표시 여부 상태 추가
    const user = getLoggedInUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.email) {
            const storedUsers = JSON.parse(localStorage.getItem(`users_${user.email}`)) || [];
            setUsers(storedUsers);
            setMemberNames(storedUsers.map(user => ({ name: user.name, email: user.email })));
        }
    }, [user.email]);

    useEffect(() => {
        if (isLoggedIn() && user.loginType !== '트레이너') {
            alert('접근 권한이 없습니다.');
            navigate('/');
        }
    }, [user, navigate]);

    const handleAddUser = (newUser, memo) => {
        const updatedUser = { ...newUser, memo, trainer: user.email };
        const updatedUsers = [...users, updatedUser];
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => ({ name: user.name, email: user.email })));
        localStorage.setItem(`users_${user.email}`, JSON.stringify(updatedUsers));
    };

    const handleDeleteMember = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => ({ name: user.name, email: user.email })));
        localStorage.setItem(`users_${user.email}`, JSON.stringify(updatedUsers));
    };

    const handleDeleteAllUsers = () => {
        if (window.confirm('모든 회원을 삭제하시겠습니까?')) {
            setUsers([]);
            setMemberNames([]);
            localStorage.removeItem(`users_${user.email}`);
        }
    };

    // 미디어 쿼리 변경 감지 및 상태 업데이트
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsCategoryVisible(false);
            } else {
                setIsCategoryVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);

        // 초기 상태 설정
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="management-container">
            {isCategoryVisible && (
                <div className='manacategory'>
                    <CategoryContainer memberNames={memberNames} />
                </div>
            )}
            <div className='maco'>
                <Management
                    loggedInEmail={user.email}
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
