import React, { useEffect, useState } from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import { getLoggedInUser, isLoggedIn } from '../../helpers/auth';
import { Navigate } from 'react-router-dom';
import './ManagementContainer.css';

function ManagementContainer() {
    const [memberNames, setMemberNames] = useState([]);

    useEffect(() => {
        const storedMemos = JSON.parse(localStorage.getItem('memos')) || [];
        const user = getLoggedInUser();
        const filteredMemos = storedMemos.filter(memo => memo.trainer === user.email);
        const names = filteredMemos.map(memo => memo.name);
        setMemberNames(names);
    }, []);

    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    const user = getLoggedInUser();

    if (user.loginType !== '트레이너') {
        return <div>접근 권한이 없습니다.</div>;
    }

    return (
        <div className="management-container">
            <div className='manacategory'>
                <CategoryContainer memberNames={memberNames} />
            </div>
            <div className='maco'>
                <Management loggedInEmail={user.email} />
            </div>
        </div>
    );
}

export default ManagementContainer;
