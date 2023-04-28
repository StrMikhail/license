import { Space, Typography } from 'antd';
import React from 'react';

const ProgramVersion = () => {
    return (
        <Space.Compact size="small" block="true" direction="vertical" style={{ padding: '10px' }}>
            <Typography.Text className="version">Горизон-ВС</Typography.Text>
            <Typography.Text className="version">Генератор лицензии</Typography.Text>
            <Typography.Text className="version">Версия 1.1.1</Typography.Text>
        </Space.Compact>
    );
};

export default ProgramVersion;
