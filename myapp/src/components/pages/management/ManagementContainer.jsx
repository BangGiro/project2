import React, { useEffect, useState } from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import { getLoggedInUser } from '../helpers/auth'; // isLoggedIn 삭제
import './ManagementContainer.css';

function ManagementContainer() {
    const [memberNames, setMemberNames] = useState([]);
    const [users, setUsers] = useState([]);
    const [isCategoryVisible, setIsCategoryVisible] = useState(true);
    const user = getLoggedInUser();

    useEffect(() => {
        if (user && user.email) {
            const storedUsers = JSON.parse(localStorage.getItem(`users_${user.email}`)) || [];
            setUsers(storedUsers);
            setMemberNames(storedUsers.map(user => ({ name: user.name, email: user.email })));
        }
    }, [user?.email]); // Optional chaining 사용

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
                    loggedInEmail={user?.email}
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
