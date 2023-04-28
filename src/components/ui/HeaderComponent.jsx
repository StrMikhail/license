import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Row } from 'antd';
import HeaderLogo from '../HeaderLogo';

const HeaderComponent = () => {
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
