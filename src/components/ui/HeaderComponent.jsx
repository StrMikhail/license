import React, { useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Button, Row } from 'antd';
import HeaderLogo from '../HeaderLogo';
import ModalCheckLicense from '../ModalCheckLicense';
import { useLocation } from 'react-router-dom';

const HeaderComponent = () => {
    const location = useLocation();

    return (
        <Header
            style={{
                backgroundColor: 'transparent',
                height: 'var(--header_height)',
                padding: '10px 20px',
            }}>
            <Row justify="space-between" align="middle">
                <HeaderLogo />
            </Row>
        </Header>
    );
};

export default HeaderComponent;
