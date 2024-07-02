import React, { useEffect, useState } from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import { getLoggedInUser, isLoggedIn } from '../../helpers/auth';
import { Navigate } from 'react-router-dom';
import './ManagementContainer.css';

function ManagementContainer() {
    const [memberNames, setMemberNames] = useState([]);
    const [users, setUsers] = useState([]);
    const user = getLoggedInUser();

    useEffect(() => {
        if (user && user.email) {
            const storedUsers = JSON.parse(localStorage.getItem(`users_${user.email}`)) || [];
            setUsers(storedUsers);
            setMemberNames(storedUsers.map(user => user.name));
        }
    }, [user]);

    const handleAddUser = (newUser, memo) => {
        const updatedUser = { ...newUser, memo, trainer: user.email };
        const updatedUsers = [...users, updatedUser];
        setUsers(updatedUsers);
        setMemberNames(updatedUsers.map(user => user.name));
        localStorage.setItem(`users_${user.email}`, JSON.stringify(updatedUsers));
    };

    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    if (user.loginType !== '트레이너') {
        return <div>접근 권한이 없습니다.</div>;
    }

    return (
        <div className="management-container">
            <div className='manacategory'>
                <CategoryContainer memberNames={memberNames} />
            </div>
            <div className='maco'>
                <Management loggedInEmail={user.email} onAddUser={handleAddUser} />
            </div>
        </div>
    );
}

export default ManagementContainer;
