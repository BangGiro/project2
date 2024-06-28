// src/helpers/auth.js

export const isLoggedIn = () => {
    return localStorage.getItem('user') !== null;
};

export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const loginUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};
