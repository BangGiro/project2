import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

const isLoggedIn = () => {
    return localStorage.getItem('user') !== null;
};
