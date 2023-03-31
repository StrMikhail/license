import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';

const Layout = () => {
    return (
        <div className="main">
            <div className="header">
                <HeaderLogo />
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
