import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import { Row } from 'antd';

const HeaderLogo = () => {

    return (
        <Link to="/">
            <Row justify="center" align="middle">
                <Logo
                    className="logo_svg"
                />
            </Row>
        </Link>
    );
};

export default HeaderLogo;
