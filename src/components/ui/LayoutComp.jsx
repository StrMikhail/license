import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';
import ProgramVersion from '../ProgramVersion';

const LayoutComp = () => {
    return (
        <Layout style={{ backgroundColor: 'transparent', height: '99.9vh' }}>
            <HeaderComponent />
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Outlet />
            </Content>
            <ProgramVersion />
        </Layout>
    );
};

export default LayoutComp;
