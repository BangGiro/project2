import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import FloatingButton from './FloatingButton';

const Layout = ({ loggedIn, onLogout }) => {
return (
    <div>
        <FloatingButton/>
    <Header loggedIn={loggedIn} onLogout={onLogout} />
    <main>
        <Outlet />
    </main>
    <Footer />
    </div>
);
};

export default Layout;
