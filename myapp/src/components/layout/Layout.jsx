import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ loggedIn, onLogout }) => {
return (
    <div>
    <Header loggedIn={loggedIn} onLogout={onLogout} />
    <main>
        <Outlet />
    </main>
    <Footer />
    </div>
);
};

export default Layout;
