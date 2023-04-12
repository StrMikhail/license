import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLogo from '../HeaderLogo';

const LayoutComp = () => {
    return (
        <Layout style={{ backgroundColor: 'transparent' }}>
            <Header
                style={{
                    backgroundColor: 'transparent',
                    height: '100px',
                    marginTop: '40px',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                }}>
                <HeaderLogo />
            </Header>
            <Content
                style={{
                    height: 'calc(100vh - 100px - 40px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default LayoutComp;
