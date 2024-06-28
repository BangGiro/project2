// src/components/management/ManagementContainer.jsx

import React from 'react';
import Management from './components/Management';
import CategoryContainer from './components/CategoryContainer';
import { getLoggedInUser, isLoggedIn } from '../../helpers/auth';
import { Navigate } from 'react-router-dom';
import './ManagementContainer.css';

function ManagementContainer() {
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
                <CategoryContainer />
            </div>
            <div className='maco'>
                <Management loggedInEmail={user.email} />
            </div>
        </div>
    );
}

export default ManagementContainer;
