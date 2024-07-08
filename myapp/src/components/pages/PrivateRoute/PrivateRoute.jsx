// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../helpers/auth';

const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
