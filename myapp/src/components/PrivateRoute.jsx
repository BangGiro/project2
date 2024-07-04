// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../helpers/auth';

const PrivateRoute = ({ element }) => {
  
  return isLoggedIn() ? element : 
    <Navigate to="/login" />,
    alert('로그인이 필요한 페이지 입니다.');
};

export default PrivateRoute;
