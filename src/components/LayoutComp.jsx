import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';

const LayoutComp = () => {
    return (
        <Layout style={{ backgroundColor: 'transparent' }}>
            <Header
                style={{
                    backgroundColor: 'transparent',
                    height: '25vh',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                }}>
                <HeaderLogo />
            </Header>
            <Content style={{ height: '75vh' }}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default LayoutComp;
